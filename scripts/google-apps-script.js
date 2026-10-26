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
  var p1 = data.partner1Name || "Partner 1";
  var p2 = data.partner2Name || "Partner 2";
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

  var p1 = details.partner1Name || "Partner 1";
  var p2 = details.partner2Name || "Partner 2";
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

  // 3. Update Overview Sheet Row Status
  try {
    var overviewSheet = ss.getSheetByName("Overview") || ss.getSheets()[0];
    if (rowIndex && rowIndex <= overviewSheet.getLastRow()) {
      overviewSheet.getRange(rowIndex, 10).setValue("Completed (Photos Synced)").setBackground("#dcfce7").setFontColor("#15803d");
    }
  } catch (sheetErr) {
    // Non-fatal
  }

  // 4. Send Email Notification
  try {
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.indexOf("@") !== -1) {
      var subject = "🎉 New Wedding Website Client: " + coupleTitle;
      var body = "Hi Ore,\n\n"
        + "A new couple has submitted their wedding website onboarding details and assets!\n\n"
        + "Couple: " + coupleTitle + "\n"
        + "Email: " + (details.email || "N/A") + "\n"
        + "Phone: " + (details.phone || "N/A") + "\n"
        + "Wedding Date: " + (details.weddingDate || "N/A") + "\n"
        + "Domain Preference: " + (details.domainName || "N/A") + " (" + (details.domainType || "") + ")\n"
        + "Song Choice: " + (details.backgroundSong || "N/A") + "\n\n"
        + "👉 Dedicated Google Sheet Tab: '" + clientTabName + "' in your Master Spreadsheet\n"
        + "👉 Google Drive Folder: " + masterFolder.getUrl() + "\n\n"
        + "Happy building!\n- Ore Okunade Wedding Portal";
      MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    }
  } catch (mailErr) {
    // Non-fatal
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
  var sections = [
    ["SECTION: CONTACT & BASICS", ""],
    ["Partner 1", (d.partner1Name || "") + (d.partner1Nickname ? " (" + d.partner1Nickname + ")" : "")],
    ["Partner 2", (d.partner2Name || "") + (d.partner2Nickname ? " (" + d.partner2Nickname + ")" : "")],
    ["Email", d.email || ""],
    ["Phone / WhatsApp", d.phone || ""],
    ["Official Hashtag", d.hashtag || ""],
    ["Domain Selection", (d.domainName || "") + "  [" + (d.domainType || "") + "]"],
    ["", ""],

    ["SECTION: DATES & VENUES", ""],
    ["Main Wedding Date", d.weddingDate || ""],
    ["Traditional Wedding Date", d.traditionalDate || "N/A"],
    ["Color Palette", d.colorPalette || ""],
    ["Palette Hex / Notes", d.paletteNotes || ""],
    ["Dress Code", d.dressCode || ""],
    ["Ceremony Venue", d.ceremonyVenue || ""],
    ["Ceremony Time", d.ceremonyTime || ""],
    ["Ceremony Address & Map", d.ceremonyAddress || ""],
    ["Reception Venue", d.receptionVenue || ""],
    ["Reception Time", d.receptionTime || ""],
    ["Reception Address & Map", d.receptionAddress || ""],
    ["Day-of Schedule Notes", d.scheduleNotes || ""],
    ["", ""],

    ["SECTION: LOVE STORY & QUOTE", ""],
    ["How We Met", d.howWeMet || ""],
    ["The Proposal", d.theProposal || ""],
    ["Key Milestones", d.milestones || ""],
    ["Guest Welcome Quote", d.coupleQuote || ""],
    ["", ""],

    ["SECTION: REGISTRY, MUSIC & DESIGN", ""],
    ["RSVP Deadline", d.rsvpDeadline || ""],
    ["RSVP Rules / Policy", d.rsvpRules || ""],
    ["Cash Gift / Bank Info", d.bankDetails || ""],
    ["External Registry Links", d.registryLinks || ""],
    ["Background Song Choice", d.backgroundSong || "Not specified"],
    ["Design Aesthetic", d.designStyle || ""],
    ["Additional Requests", d.additionalNotes || ""]
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
  b.push("   Main Wedding Date: " + (d.weddingDate || "N/A"));
  b.push("   Traditional Date: " + (d.traditionalDate || "N/A"));
  b.push("   Color Palette: " + (d.colorPalette || "N/A"));
  b.push("   Palette Hex/Notes: " + (d.paletteNotes || "N/A"));
  b.push("   Dress Code: " + (d.dressCode || "N/A"));
  b.push("   Ceremony: " + (d.ceremonyVenue || "N/A") + " @ " + (d.ceremonyTime || "N/A"));
  b.push("   Ceremony Address: " + (d.ceremonyAddress || "N/A"));
  b.push("   Reception: " + (d.receptionVenue || "N/A") + " @ " + (d.receptionTime || "N/A"));
  b.push("   Reception Address: " + (d.receptionAddress || "N/A"));
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

  b.push("5. MUSIC & DESIGN");
  b.push("   Song Choice (Title & Artist): " + (d.backgroundSong || "Not specified"));
  b.push("   (Note: Audio file will be sourced and mastered directly by Ore)\n");
  b.push("   Design Style: " + (d.designStyle || "Romantic Modern Luxury"));
  b.push("   Additional Notes: " + (d.additionalNotes || "None"));

  return b.join("\n");
}

function responseJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
