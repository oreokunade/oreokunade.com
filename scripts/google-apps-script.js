/**
 * GOOGLE APPS SCRIPT FOR ORE OKUNADE WEDDING CLIENT PORTAL
 * -------------------------------------------------------------
 * Features:
 * 1. Single Master Google Spreadsheet:
 *    - "Overview" tab: High-level dashboard listing every couple, dates, status, domain type, and links.
 *    - Dedicated Tab Per Client: Automatically creates a formatted tab for each couple (e.g. "Tola & Tunde - Dec 2026")
 *      acting as a complete creative cheat-sheet with copy, hex codes, schedule, and Drive folder link.
 * 2. Automated Google Drive Folder Structure:
 *    📁 [Wedding] Partner 1 & Partner 2 - Date/
 *        📁 01_Hero_Image/
 *        📁 02_Our_Story_Photo/
 *        📁 03_Gallery_Photos/
 *        📄 Wedding_Website_Creative_Brief.txt
 * 3. Direct Browser-to-Drive Uploads (Bypassing Vercel 4.5MB limit).
 */

// OPTIONAL: If you want all wedding folders created inside a specific master folder in Drive, paste its ID here.
// Leave empty string ("") to create folders in your root Google Drive.
var ROOT_FOLDER_ID = "";

// Notification email where new client onboarding alerts will be sent
var NOTIFICATION_EMAIL = "scalewithoreo@gmail.com";

/**
 * Handle GET requests (test if Web App is live)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "Ore Okunade Wedding Portal Apps Script is live and ready!",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests from the client's browser
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var hasLock = lock.tryLock(30000);
  
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJSON({ status: "error", message: "No data payload received" });
    }

    var data = JSON.parse(e.postData.contents);
    var action = data.action;

    if (action === "ping") {
      return responseJSON({ status: "success", message: "Connection successful" });
    }

    if (action === "init") {
      return handleInit(data);
    }

    if (action === "uploadFile") {
      return handleFileUpload(data);
    }

    if (action === "finalize") {
      return handleFinalize(data);
    }

    return responseJSON({ status: "error", message: "Unknown action: " + action });

  } catch (err) {
    return responseJSON({
      status: "error",
      message: err.toString(),
      stack: err.stack
    });
  } finally {
    if (hasLock) {
      lock.releaseLock();
    }
  }
}

/**
 * Action: "init"
 * Creates the Google Drive master folder, subfolders, adds row to Overview sheet,
 * and creates a dedicated tab for the couple.
 */
function handleInit(data) {
  var p1 = data.brideNickname || data.brideFirstName || data.partner1Name || "Bride";
  var p2 = data.groomNickname || data.groomFirstName || data.partner2Name || "Groom";
  var weddingDate = data.weddingDate || "Upcoming";
  var email = data.email || "";
  var phone = data.phone || "";
  var hashtag = data.hashtag || "";
  var domainType = data.domainType || ".online (Included)";
  var domainName = data.domainName || "";

  var folderName = "[Wedding] " + p1 + " & " + p2 + " - " + weddingDate;
  
  // Get parent folder or root Drive
  var parentFolder = ROOT_FOLDER_ID && ROOT_FOLDER_ID.trim() !== ""
    ? DriveApp.getFolderById(ROOT_FOLDER_ID.trim())
    : DriveApp.getRootFolder();

  // Create Master Folder in Drive
  var masterFolder = parentFolder.createFolder(folderName);
  var masterFolderUrl = masterFolder.getUrl();
  var masterFolderId = masterFolder.getId();

  // Create Subfolders for photos
  var heroFolder = masterFolder.createFolder("01_Hero_Image");
  var storyFolder = masterFolder.createFolder("02_Our_Story_Photo");
  var galleryFolder = masterFolder.createFolder("03_Gallery_Photos");

  // Manage Google Spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Get or Create "Overview" tab
  var overviewSheet = ss.getSheetByName("Overview");
  if (!overviewSheet) {
    // If the default "Sheet1" exists, rename it to Overview
    var firstSheet = ss.getSheets()[0];
    if (firstSheet && firstSheet.getName() === "Sheet1") {
      firstSheet.setName("Overview");
      overviewSheet = firstSheet;
    } else {
      overviewSheet = ss.insertSheet("Overview", 0);
    }
  }

  // Ensure Overview headers exist
  if (overviewSheet.getLastRow() === 0) {
    overviewSheet.appendRow([
      "Timestamp",
      "Couple",
      "Wedding Date",
      "Email",
      "Phone / WhatsApp",
      "Domain Selected",
      "Hashtag",
      "Drive Folder Link",
      "Client Sheet Tab",
      "Status",
      "Folder ID"
    ]);
    var headerRange = overviewSheet.getRange(1, 1, 1, 11);
    headerRange.setFontWeight("bold").setBackground("#1e293b").setFontColor("#f8fafc");
    overviewSheet.setFrozenRows(1);
  }

  // 2. Create or Get Dedicated Tab for this Couple
  var clientTabName = (p1 + " & " + p2).substring(0, 30); // Max 30 chars for Sheet tab
  var existingClientSheet = ss.getSheetByName(clientTabName);
  var counter = 1;
  while (existingClientSheet) {
    clientTabName = (p1 + " & " + p2).substring(0, 26) + " (" + counter + ")";
    existingClientSheet = ss.getSheetByName(clientTabName);
    counter++;
  }
  var clientSheet = ss.insertSheet(clientTabName);

  // Setup Client Sheet initial layout
  setupClientSheetHeader(clientSheet, p1, p2, weddingDate, masterFolderUrl, domainName, domainType);

  // Log into Overview Sheet
  var row = [
    new Date(),
    p1 + " & " + p2,
    weddingDate,
    email,
    phone,
    domainName + " (" + domainType + ")",
    hashtag,
    masterFolderUrl,
    clientTabName,
    "Uploading Assets...",
    masterFolderId
  ];
  overviewSheet.appendRow(row);
  var rowIndex = overviewSheet.getLastRow();

  return responseJSON({
    status: "success",
    folderId: masterFolderId,
    folderUrl: masterFolderUrl,
    rowIndex: rowIndex,
    clientTabName: clientTabName,
    subfolders: {
      hero: heroFolder.getId(),
      story: storyFolder.getId(),
      gallery: galleryFolder.getId()
    }
  });
}

/**
 * Setup visual layout for the couple's dedicated sheet tab
 */
function setupClientSheetHeader(sheet, p1, p2, weddingDate, folderUrl, domainName, domainType) {
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 500);

  // Title Banner
  sheet.getRange("A1:B1").merge()
    .setValue("💍 WEDDING CLIENT BRIEF: " + p1.toUpperCase() + " & " + p2.toUpperCase())
    .setFontWeight("bold")
    .setFontSize(14)
    .setBackground("#0f172a")
    .setFontColor("#fbbf24")
    .setHorizontalAlignment("center");

  sheet.getRange("A2:B2").merge()
    .setValue("Wedding Date: " + weddingDate + "  |  Status: Onboarding in progress")
    .setFontSize(10)
    .setBackground("#1e293b")
    .setFontColor("#94a3b8")
    .setHorizontalAlignment("center");

  var rows = [
    ["Google Drive Vault", folderUrl],
    ["Domain Preference", domainName ? domainName + " [" + domainType + "]" : "Not specified"],
    ["", ""]
  ];

  sheet.getRange(3, 1, rows.length, 2).setValues(rows);
  sheet.getRange("A3:A4").setFontWeight("bold").setBackground("#f1f5f9");
}

/**
 * Action: "uploadFile"
 * Decodes Base64 data and writes it to the designated subfolder.
 */
function handleFileUpload(data) {
  var folderId = data.folderId;
  var filename = data.filename || "photo_" + new Date().getTime();
  var mimeType = data.mimeType || "image/jpeg";
  var base64Data = data.base64Data;

  if (!folderId) {
    return responseJSON({ status: "error", message: "Target folder ID is required" });
  }
  if (!base64Data) {
    return responseJSON({ status: "error", message: "No base64 data provided" });
  }

  // Strip data URL scheme prefix if present
  var cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, "");
  var decoded = Utilities.base64Decode(cleanBase64);
  var blob = Utilities.newBlob(decoded, mimeType, filename);

  var targetFolder = DriveApp.getFolderById(folderId);
  var createdFile = targetFolder.createFile(blob);

  return responseJSON({
    status: "success",
    fileId: createdFile.getId(),
    fileUrl: createdFile.getUrl(),
    filename: filename,
    sizeBytes: createdFile.getSize()
  });
}

/**
 * Action: "finalize"
 * Populates the couple's dedicated tab with full structured details,
 * generates the Creative Brief in Drive, updates Overview row, and emails notification.
 */
function handleFinalize(data) {
  var folderId = data.folderId;
  var rowIndex = data.rowIndex;
  var clientTabName = data.clientTabName;
  var details = data.details || {};

  var p1 = details.brideFirstName || details.brideFullName || details.partner1Name || "Bride";
  var p2 = details.groomFirstName || details.groomFullName || details.partner2Name || "Groom";
  var coupleTitle = p1 + " & " + p2;

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Populate the Couple's Dedicated Tab
  if (clientTabName) {
    var sheet = ss.getSheetByName(clientTabName);
    if (sheet) {
      fillClientSheetContent(sheet, details);
    }
  }

  // 2. Generate Creative Brief .txt file inside Drive Folder
  var masterFolder = DriveApp.getFolderById(folderId);
  var briefText = buildBriefText(coupleTitle, details, masterFolder.getUrl());
  var briefFile = masterFolder.createFile("Wedding_Website_Creative_Brief.txt", briefText, "text/plain");

  // Generate & save ready-to-run AI Website Builder Prompt in Google Drive
  var aiPrompt = details.aiPrompt || briefText;
  masterFolder.createFile("AI_WEBSITE_BUILDER_PROMPT.txt", aiPrompt, "text/plain");

  // 3. Update Overview Sheet Row Status
  try {
    var overviewSheet = ss.getSheetByName("Overview") || ss.getSheets()[0];
    if (rowIndex && rowIndex <= overviewSheet.getLastRow()) {
      overviewSheet.getRange(rowIndex, 10).setValue("Completed (Photos Synced)").setBackground("#dcfce7").setFontColor("#15803d");
    }
  } catch (sheetErr) {
    // Non-fatal
  }

  // 4. Send Rich HTML Email Notification
  try {
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.indexOf("@") !== -1) {
      var subject = "🎉 New Wedding Website Client: " + coupleTitle;
      var formattedDomain = details.domainName ? details.domainName + ".online" : "Pending";

      var body = "Hi Ore,\n\n"
        + "A new couple has submitted their wedding website onboarding details and assets!\n\n"
        + "Couple: " + coupleTitle + "\n"
        + "Email: " + (details.email || "N/A") + "\n"
        + "Phone: " + (details.phone || "N/A") + "\n"
        + "Wedding Date: " + (details.weddingDate || "N/A") + "\n"
        + "Domain: " + formattedDomain + "\n"
        + "Song Choice: " + (details.backgroundSong || "N/A") + "\n"
        + (details.driveFolderLink ? "Photographer Drive/Cloud Link: " + details.driveFolderLink + "\n" : "")
        + "\n👉 Google Drive Vault: " + masterFolder.getUrl() + "\n"
        + "👉 Dedicated Google Sheet Tab: '" + clientTabName + "' in your Master Spreadsheet\n\n"
        + "Happy building!\n- Ore Okunade Wedding Portal";

      var htmlBody = "<div style='font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;'>"
        + "<div style='background:#0f172a;padding:24px;text-align:center;color:#ffffff;'>"
        + "<h1 style='margin:0;font-size:20px;font-weight:700;letter-spacing:-0.5px;'>💍 New Wedding Client Submission</h1>"
        + "<p style='margin:6px 0 0;font-size:14px;color:#94a3b8;'>" + coupleTitle + "</p>"
        + "</div>"
        + "<div style='padding:24px;color:#334155;font-size:14px;line-height:1.6;'>"
        + "<p style='margin-top:0;'>Hi Ore,</p>"
        + "<p>A new couple has completed their onboarding form on your wedding portal. Here is their executive summary:</p>"
        + "<div style='background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:16px 0;'>"
        + "<table style='width:100%;font-size:13px;border-collapse:collapse;'>"
        + "<tr><td style='padding:6px 0;color:#64748b;width:40%;'>Couple:</td><td style='padding:6px 0;font-weight:600;color:#0f172a;'>" + coupleTitle + "</td></tr>"
        + "<tr><td style='padding:6px 0;color:#64748b;'>Wedding Date:</td><td style='padding:6px 0;font-weight:600;color:#0f172a;'>" + (details.weddingDate || "N/A") + "</td></tr>"
        + "<tr><td style='padding:6px 0;color:#64748b;'>Domain:</td><td style='padding:6px 0;font-weight:600;color:#2563eb;'><a href='https://" + formattedDomain + "' target='_blank' style='color:#2563eb;text-decoration:none;'>" + formattedDomain + "</a></td></tr>"
        + "<tr><td style='padding:6px 0;color:#64748b;'>Email:</td><td style='padding:6px 0;font-weight:600;color:#0f172a;'><a href='mailto:" + (details.email || "") + "' style='color:#0f172a;'>" + (details.email || "N/A") + "</a></td></tr>"
        + "<tr><td style='padding:6px 0;color:#64748b;'>Phone / WhatsApp:</td><td style='padding:6px 0;font-weight:600;color:#0f172a;'>" + (details.phone || "N/A") + "</td></tr>"
        + "<tr><td style='padding:6px 0;color:#64748b;'>Background Song:</td><td style='padding:6px 0;font-weight:600;color:#0f172a;'>" + (details.backgroundSong || "Not specified") + "</td></tr>"
        + (details.colorPalette ? "<tr><td style='padding:6px 0;color:#64748b;'>Colour of the Day:</td><td style='padding:6px 0;font-weight:600;color:#0f172a;'>" + details.colorPalette + "</td></tr>" : "")
        + "</table>"
        + "</div>"
        + (details.driveFolderLink ? "<div style='margin-bottom:16px;padding:12px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;'><div style='font-size:12px;font-weight:700;color:#1e40af;margin-bottom:4px;'>📸 PHOTOGRAPHER CLOUD / DRIVE LINK PROVIDED</div><a href='" + details.driveFolderLink + "' target='_blank' style='word-break:break-all;color:#2563eb;font-weight:600;font-size:13px;'>" + details.driveFolderLink + "</a></div>" : "")
        + (details.aiPrompt ? "<div style='margin-top:20px;border-top:1px solid #e2e8f0;padding-top:16px;'><div style='font-size:13px;font-weight:700;color:#0f172a;margin-bottom:6px;'>⚡ AI WEBSITE BUILDER PROMPT (COPY & PASTE TO BUILD):</div><pre style='background:#0f172a;color:#f8fafc;padding:14px;border-radius:8px;font-family:monospace;font-size:11px;white-space:pre-wrap;max-height:300px;overflow-y:auto;border:1px solid #334155;line-height:1.5;'>" + details.aiPrompt.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre></div>" : "")
        + "<div style='text-align:center;margin:24px 0 12px;'>"
        + "<a href='" + masterFolder.getUrl() + "' target='_blank' style='display:inline-block;background:#0f172a;color:#ffffff;padding:12px 24px;border-radius:9999px;font-weight:600;font-size:13px;text-decoration:none;'>📁 Open Google Drive Vault</a>"
        + "</div>"
        + "<p style='font-size:12px;color:#94a3b8;text-align:center;margin-top:16px;'>Dedicated Tab <strong>" + clientTabName + "</strong> has been created in your Master Spreadsheet.</p>"
        + "</div>"
        + "</div>";

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: subject,
        body: body,
        htmlBody: htmlBody
      });
    }
  } catch (mailErr) {
    Logger.log("Email notification error: " + mailErr.toString());
  }

  return responseJSON({
    status: "success",
    message: "Submission finalized successfully!",
    folderUrl: masterFolder.getUrl(),
    clientTabName: clientTabName
  });
}

/**
 * Fills the client's dedicated tab with clean sections
 */
function fillClientSheetContent(sheet, d) {
  var brideVal = (d.brideFirstName || d.partner1Name || "") + (d.brideNickname ? " (Nickname: " + d.brideNickname + ")" : "");
  var groomVal = (d.groomFirstName || d.partner2Name || "") + (d.groomNickname ? " (Nickname: " + d.groomNickname + ")" : "");
  var sections = [
    ["SECTION: CONTACT & BASICS", ""],
    ["Bride", brideVal],
    ["Groom", groomVal],
    ["Email", d.email || ""],
    ["Phone / WhatsApp", d.phone || ""],
    ["Official Hashtag", d.hashtag || ""],
    ["Domain Selection", (d.domainName || "") + "  [" + (d.domainType || "") + "]"],
    ["", ""],

    ["SECTION: DATES & VENUES", ""],
    ["Schedule Format", d.eventScheduleType === "separate" ? "Separate Day Events (Traditional & Main)" : "Single Day Event"],
    ["Main Wedding Date", d.weddingDate || ""],
    ["Traditional Wedding Date", d.traditionalDate || "N/A"],
    ["Traditional Venue", d.traditionalVenue || "N/A"],
    ["Traditional Time", d.traditionalTime || "N/A"],
    ["Traditional Address / Location", d.traditionalAddress || "N/A"],
    ["Traditional Attire / Aso-Ebi", d.traditionalDressCode || "N/A"],
    ["Colour of the Day (Optional)", d.colorPalette || ""],
    ["Palette Hex / Notes", d.paletteNotes || ""],
    ["Dress Code (Main Wedding)", d.dressCode || ""],
    ["Ceremony Venue", d.ceremonyVenue || ""],
    ["Ceremony Time", d.ceremonyTime || ""],
    ["Ceremony Address / Location", d.ceremonyAddress || ""],
    ["Reception Venue", d.receptionVenue || ""],
    ["Reception Time", d.receptionTime || ""],
    ["Reception Address / Location", d.receptionAddress || ""],
    ["After-Party Venue", d.afterPartyVenue || "N/A"],
    ["After-Party Time", d.afterPartyTime || "N/A"],
    ["After-Party Address / Location", d.afterPartyAddress || "N/A"],
    ["After-Party Notes", d.afterPartyNotes || "N/A"],
    ["", ""],

    ["SECTION: LOVE STORY & QUOTE", ""],
    ["How We Met", d.howWeMet || ""],
    ["The Proposal", d.theProposal || ""],
    ["Key Milestones", d.milestones || ""],
    ["Guest Welcome Quote", d.coupleQuote || ""],
    ["", ""],

    ["SECTION: ASSETS, REGISTRY & MUSIC", ""],
    ["Photographer Drive / Cloud Album", d.driveFolderLink || "N/A"],
    ["RSVP Deadline", d.rsvpDeadline || ""],
    ["RSVP Rules / Policy", d.rsvpRules || ""],
    ["Cash Gift / Bank Info", d.bankDetails || ""],
    ["External Registry Links", d.registryLinks || ""],
    ["Background Song Choice", d.backgroundSong || "Not specified"],
    ["Additional Requests", d.additionalNotes || ""],
    ["", ""],

    ["SECTION: AI WEBSITE BUILDER PROMPT (COPY-PASTE READY)", ""],
    ["AI Website Prompt", d.aiPrompt || "N/A"]
  ];

  var startRow = 6;
  sheet.getRange(startRow, 1, sections.length, 2).setValues(sections);

  // Style section headers
  for (var i = 0; i < sections.length; i++) {
    var currentRow = startRow + i;
    if (sections[i][0].indexOf("SECTION:") === 0) {
      sheet.getRange(currentRow, 1, 1, 2)
        .setFontWeight("bold")
        .setBackground("#e2e8f0")
        .setFontColor("#0f172a");
    } else if (sections[i][0] !== "") {
      sheet.getRange(currentRow, 1).setFontWeight("bold").setFontColor("#475569");
    }
  }

  sheet.getRange("B6:B" + (startRow + sections.length)).setWrap(true);
}

/**
 * Builds plaintext brief for the Drive folder
 */
function buildBriefText(coupleTitle, d, folderUrl) {
  var b = [];
  b.push("=================================================");
  b.push("  WEDDING WEBSITE CREATIVE BRIEF & ASSET MANIFEST");
  b.push("  Couple: " + coupleTitle);
  b.push("  Drive Vault: " + folderUrl);
  b.push("  Generated: " + new Date().toLocaleString());
  b.push("=================================================\n");

  b.push("1. COUPLE OVERVIEW");
  b.push("   Partner 1: " + (d.partner1Name || "N/A") + (d.partner1Nickname ? " (" + d.partner1Nickname + ")" : ""));
  b.push("   Partner 2: " + (d.partner2Name || "N/A") + (d.partner2Nickname ? " (" + d.partner2Nickname + ")" : ""));
  b.push("   Email: " + (d.email || "N/A"));
  b.push("   Phone: " + (d.phone || "N/A"));
  b.push("   Official Hashtag: " + (d.hashtag || "N/A"));
  b.push("   Domain Preference: " + (d.domainName || "N/A") + " [" + (d.domainType || "") + "]\n");

  b.push("2. DATES, VENUES & SCHEDULE");
  b.push("   Schedule Type: " + (d.eventScheduleType === "separate" ? "Separate Day Events (Traditional & Main)" : "Single Day Event"));
  if (d.eventScheduleType === "separate") {
    b.push("   [DAY 1: TRADITIONAL WEDDING]");
    b.push("   Date: " + (d.traditionalDate || "N/A"));
    b.push("   Venue: " + (d.traditionalVenue || "N/A") + " @ " + (d.traditionalTime || "N/A"));
    b.push("   Address: " + (d.traditionalAddress || "N/A"));
    b.push("   Attire / Aso-Ebi: " + (d.traditionalDressCode || "N/A") + "\n");
    b.push("   [DAY 2: MAIN WEDDING]");
  }
  b.push("   Main Wedding Date: " + (d.weddingDate || "N/A"));
  b.push("   Color Palette: " + (d.colorPalette || "N/A"));
  b.push("   Palette Hex/Notes: " + (d.paletteNotes || "N/A"));
  b.push("   Dress Code: " + (d.dressCode || "N/A"));
  b.push("   Ceremony: " + (d.ceremonyVenue || "N/A") + " @ " + (d.ceremonyTime || "N/A"));
  b.push("   Ceremony Address: " + (d.ceremonyAddress || "N/A"));
  b.push("   Reception: " + (d.receptionVenue || "N/A") + " @ " + (d.receptionTime || "N/A"));
  b.push("   Reception Address: " + (d.receptionAddress || "N/A"));
  if (d.singleHasAfterParty || d.separateHasAfterParty || d.afterPartyVenue) {
    b.push("   After-Party: " + (d.afterPartyVenue || "N/A") + " @ " + (d.afterPartyTime || "N/A"));
    b.push("   After-Party Address: " + (d.afterPartyAddress || "N/A"));
    b.push("   After-Party Notes: " + (d.afterPartyNotes || "N/A"));
  }
  b.push("   Schedule Notes: \n" + (d.scheduleNotes || "None") + "\n");

  b.push("3. OUR LOVE STORY");
  b.push("   How We Met:\n   " + (d.howWeMet || "N/A") + "\n");
  b.push("   The Proposal:\n   " + (d.theProposal || "N/A") + "\n");
  b.push("   Milestones:\n   " + (d.milestones || "N/A") + "\n");
  b.push("   Guest Quote:\n   " + (d.coupleQuote || "N/A") + "\n");

  b.push("4. REGISTRY & RSVPs");
  b.push("   RSVP Deadline: " + (d.rsvpDeadline || "N/A"));
  b.push("   RSVP Policy: " + (d.rsvpRules || "N/A"));
  b.push("   Cash Bank Registry:\n   " + (d.bankDetails || "N/A") + "\n");
  b.push("   External Links: " + (d.registryLinks || "N/A") + "\n");

  b.push("5. ASSETS, MUSIC & REGISTRY");
  b.push("   Photographer Drive/Cloud Link: " + (d.driveFolderLink || "N/A"));
  b.push("   Song Choice (Title & Artist): " + (d.backgroundSong || "Not specified"));
  b.push("   (Note: Audio file will be sourced and mastered directly by Ore)\n");
  b.push("   Additional Notes: " + (d.additionalNotes || "None"));

  return b.join("\n");
}

function responseJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


/**
 * AUTHORIZATION HELPER:
 * Run this function manually inside the Google Apps Script Editor once:
 * 1. In the toolbar above, select "testEmailNotification"
 * 2. Click "Run" (▶️)
 * 3. Google will show "Authorization Required" -> Click "Review Permissions"
 * 4. Select your Google account (scalewithoreo@gmail.com) -> Advanced -> Go to script (unsafe) -> Click "Allow"
 * 5. A test email will immediately arrive in scalewithoreo@gmail.com!
 * 6. Once authorized, click Deploy -> Manage Deployments -> Edit -> Version: New version -> Deploy.
 */
function testEmailNotification() {
  var email = NOTIFICATION_EMAIL || "scalewithoreo@gmail.com";
  var subject = "✅ Ore Okunade Wedding Portal: Email Authorization Active";
  var htmlBody = "<div style='font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:540px;margin:20px auto;padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;'>"
    + "<h2 style='color:#0f172a;margin-top:0;'>Email Notifications Authorized! 🎉</h2>"
    + "<p style='color:#334155;font-size:14px;line-height:1.6;'>Your Google Apps Script is now authorized to send instant email alerts whenever a couple completes their wedding website onboarding form.</p>"
    + "<div style='background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:12px 16px;margin:16px 0;'>"
    + "<span style='font-size:12px;color:#64748b;'>Destination: </span>"
    + "<strong style='color:#0f172a;font-size:14px;'>" + email + "</strong>"
    + "</div>"
    + "<p style='color:#64748b;font-size:12px;margin-bottom:0;'>Ore Okunade Wedding Client Portal</p>"
    + "</div>";

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
  Logger.log("✅ Test email successfully sent to " + email);
}
