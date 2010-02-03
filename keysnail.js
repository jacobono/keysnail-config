// ========================== KeySnail Init File =========================== //

// You can preserve your code in this area when generating the init file using GUI.
// Put all your code except special key, set*key, hook, blacklist.
// ========================================================================= //
//{{%PRESERVE%

plugins.options["hok.hint_base_style"] = {
    position        : 'absolute',
    zIndex          : '2147483647',
    color           : '#000',
    fontFamily      : 'Arial',
    fontSize        : '8pt',
    lineHeight      : '8pt',
    fontWeight      : 'bold',
    padding         : '1px',
    margin          : '0px',
    textTransform   : 'lowercase'
};

plugins.options["hok.hint_color_link"]    = 'rgba(180, 255, 81, 1.0)';
plugins.options["hok.hint_color_form"]    = 'rgba(157, 82, 255, 1.0)';
plugins.options["hok.hint_color_focused"] = 'rgba(230, 116, 219, 1.0)';

key.setEditKey ('C-i', function (ev, arg) {
    ext.exec ( "edit_text", arg);
}, "Edit in external editor", true);

plugins.options [ "K2Emacs.editor"  ] = "/usr/bin/gvim -f";

// Escape (quit) key
hook.setHook('KeyBoardQuit', function (ev, aEvent) {
    if (key.currentKeySequence.length)
        return;

    command.closeFindBar();

    if (util.isCaretEnabled())
        command.resetMark(aEvent);
    else             
        goDoCommand("cmd_selectNone");

    if (KeySnail.windowType == "navigator:browser")
        key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);

    var elem = ev.originalTarget;
    elem.blur();
});

hook.addToHook("KeySnailInitialized",
    function () {
       // setPrefs here for portable tweaks 
});


//}}%PRESERVE%
// ========================================================================= //

// ========================= Special key settings ========================== //

key.quitKey              = "C-c";
key.helpKey              = "undefined";
key.escapeKey            = "C-v";
key.macroStartKey        = "undefined";
key.macroEndKey          = "undefined";
key.universalArgumentKey = "undefined";
key.negativeArgument1Key = "undefined";
key.negativeArgument2Key = "undefined";
key.negativeArgument3Key = "undefined";
key.suspendKey           = "C-z";

// ================================= Hooks ================================= //

// ============================= Key bindings ============================== //

key.setViewKey('j', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
}, 'Scroll line down');

key.setViewKey('k', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
}, 'Scroll line up');

key.setViewKey('C-d', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
}, 'Scroll 10 lines down');

key.setViewKey('C-u', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
}, 'Scroll 10 lines up');

key.setViewKey('h', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_LEFT, true);
}, 'Scroll left');

key.setViewKey('l', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_RIGHT, true);
}, 'Scroll right');

key.setViewKey('y', function () {
    const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].  
    getService(Components.interfaces.nsIClipboardHelper);  
    gClipboardHelper.copyString(window._content.location.href.toString());
}, 'yank (copy) current location');

key.setViewKey('Y', function () {
    goDoCommand("cmd_copy");
}, 'yank (copy) selected text');

key.setViewKey('p', function () {
    openUILink(command.getClipboardText());
}, 'Paste and Go in current tab');

key.setViewKey([['P'], ['g', 'P']], function () {
    gBrowser.selectedTab = gBrowser.addTab(command.getClipboardText());
}, 'Paste and Go in new tab');

key.setViewKey(['g', 'g'], function () {
    goDoCommand("cmd_scrollTop");
}, 'Scroll to the top of the page', true);

key.setViewKey([['g', 't'], ['K']], function () {
    getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'Select next tab');

key.setViewKey([['g', 'T'], ['J']], function () {
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'Select previous tab');

key.setViewKey(['g', 'u'], function () {
    var uri = getBrowser().currentURI;
    if (uri.path == "/") {
        return;
    }
    var pathList = uri.path.split("/");
    if (!pathList.pop()) {
        pathList.pop();
    }
    loadURI(uri.prePath + pathList.join("/") + ("/"));
}, 'Go upper directory');

key.setViewKey(['g', 'U'], function () {
    var uri = window._content.location.href;
    if (uri == null) {
        return;
    }
    var root = uri.match(/^[a-z]+:\/\/[^/]+\//);
    if (root) {
        loadURI(root, null, null);
    }
}, 'Go to the root directory');

key.setViewKey(['g', 'i'], function () {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setViewKey(['g', 'h'], function () {
    var homepage = gHomeButton.getHomePage();
    openUILink(homepage);
}, 'Open homepage in current tab');

key.setViewKey(['g', 'H'], function () {
    var homepage = gHomeButton.getHomePage();
    gBrowser.selectedTab = gBrowser.addTab(homepage);
}, 'Open homepage in new background tab');

key.setViewKey(['g', '$'], function () {
    document.dispatchEvent(key.stringToKeyEvent("M-9", true));
}, 'Go to the last tab');

key.setViewKey(['g', '0'], function () {
    document.dispatchEvent(key.stringToKeyEvent("M-1", true));
}, 'Go to the first tab');

key.setViewKey(['g', 'f'], function () {
    var key = "view_source.editor.external";
    util.setBoolPref(key, false);
    BrowserViewSourceOfDocument(content.document);
    //if (util.getBoolPref(key, false)) {
    //    BrowserViewSourceOfDocument(content.document);
    //} else {
    //    util.setBoolPref(key, false);
    //    BrowserViewSourceOfDocument(content.document);
    //    util.setBoolPref(key, true);
    //}
}, 'View page source');

key.setViewKey(['g', 'F'], function () {
    var key = "view_source.editor.external";
    util.setBoolPref(key, true);
    BrowserViewSourceOfDocument(content.document);
    //var key = "view_source.editor.external";
    //if (util.getBoolPref(key, false)) {
    //    util.setBoolPref(key, true);
    //    BrowserViewSourceOfDocument(content.document);
    //    util.setBoolPref(key, false);
    //} else {
    //    BrowserViewSourceOfDocument(content.document);
    //}
}, 'View page source in external editor');

key.setViewKey('C-g', function () {
    BrowserPageInfo();
}, 'Display page information');

key.setViewKey('C-b', function () {
    goDoCommand("cmd_scrollPageUp");
}, 'Scroll page up');

key.setViewKey('C-f', function () {
    goDoCommand("cmd_scrollPageDown");
}, 'Scroll page down');

key.setViewKey('~', function () {
    var dirService = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
    var homeDirFile = dirService.get("Home", Components.interfaces.nsIFile);
    var homeDir = homeDirFile.path;
    gBrowser.selectedTab = gBrowser.addTab(homeDir);
}, 'Open home directory in new tab');

key.setViewKey('G', function () {
    goDoCommand("cmd_scrollBottom");
}, 'Scroll to the bottom of the page', true);

key.setViewKey(':', function (aEvent, aArg) {
    ext.select(aArg, aEvent);
}, 'List exts and execute selected one', true);

key.setViewKey('i', function () {
    util.setBoolPref("accessibility.browsewithcaret", true);
}, 'Start caret mode');

key.setViewKey('r', function () {
    BrowserReload();
}, 'Reload the page', true);

key.setViewKey('f', function (ev, arg) {
    ext.exec("hok-start-foreground-mode", arg);
}, 'Start foreground hint mode', true);

key.setViewKey('F', function (ev, arg) {
    ext.exec("hok-start-background-mode", arg);
}, 'Start background hint mode', true);

key.setViewKey(';', function (ev, arg) {
    ext.exec("hok-start-extended-mode", arg);
}, 'Start extended hint mode', true);

key.setViewKey('d', function (ev) {
    document.dispatchEvent(key.stringToKeyEvent("C-w", true));
}, 'Close tab/window');

key.setViewKey('D', function (ev) {
    document.dispatchEvent(key.stringToKeyEvent("C-w", true));
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'Close tab/window, focus tab to the left');

key.setViewKey('u', function (ev) {
    var r_ss = Cc['@mozilla.org/browser/sessionstore;1'].getService(Ci.nsISessionStore);
    if (r_ss.getClosedTabCount(window) > 0) {
        undoCloseTab();
    }
}, 'Undo closed tab');

key.setViewKey('R', function () {
    BrowserReloadSkipCache();
}, 'Reload (Skip cache)');

key.setViewKey('t', function (ev) {
    gBrowser.selectedTab = gBrowser.addTab("about:blank");
    command.focusToById("urlbar");
}, 'Open the new tab');

key.setViewKey('T', function () {
    var url = window._content.location.href.toString();
    gBrowser.selectedTab = gBrowser.addTab("about:blank");
    command.focusToById("urlbar");
    command.insertText(url);
}, 'Duplicate the current tab');

key.setViewKey('o', function () {
    command.focusToById("urlbar");
}, 'Focus to the location bar', true);

key.setViewKey('O', function (aEvent) {
    command.focusToById("urlbar");
    command.endLine(aEvent);
}, 'Focus location bar and go to end of line');

key.setViewKey(['Z', 'Z'], function (ev) {
    util.setIntPref("browser.startup.page", 3);
    window.goQuitApplication();
}, 'Exit Firefox and save the session');

key.setViewKey(['Z', 'Q'], function (ev) {
    util.setIntPref("browser.startup.page", 1);
    window.goQuitApplication();
}, 'Exit Firefox without saving the session');

key.setViewKey(['Z', 'R'], function () {
    var appStartup = Cc['@mozilla.org/toolkit/app-startup;1'].getService(Ci.nsIAppStartup);
    appStartup.quit(appStartup.eRestart | appStartup.eAttemptQuit);
    Application.restart();
}, 'Restart Firefox');

key.setViewKey([['-'], ['z', 'o']], function () {
    ZoomManager.reduce();
    if (ZoomManager.useFullZoom) {
        ZoomManager.useFullZoom = false;
        ZoomManager.reduce();
        ZoomManager.useFullZoom = true;
    } else {
        ZoomManager.reduce();
    }
}, 'Reduce text zoom of current page');

key.setViewKey(['z', 'O'], function () {
    if (ZoomManager.useFullZoom) {
        ZoomManager.reduce();
    } else {
        ZoomManager.useFullZoom = true;
        ZoomManager.reduce();
        ZoomManager.useFullZoom = false;
    }
}, 'Reduce full zoom of current page');

key.setViewKey([['z', 'i'], ['+']], function () {
    if (ZoomManager.useFullZoom) {
        ZoomManager.useFullZoom = false;
        ZoomManager.enlarge();
        ZoomManager.useFullZoom = true;
    } else {
        ZoomManager.enlarge();
    }
}, 'Enlarge text zoom of current page');

key.setViewKey(['z', 'I'], function () {
    if (ZoomManager.useFullZoom) {
        ZoomManager.enlarge();
    } else {
        ZoomManager.useFullZoom = true;
        ZoomManager.enlarge();
        ZoomManager.useFullZoom = false;
    }
}, 'Enlarge full zoom of current page');

key.setViewKey([['z', 'z'], ['=']], function () {
    ZoomManager.reset();
}, 'Reset text size');

key.setViewKey('C-R', function () {
    userscript.reload();
}, 'Reload the initialization file');

key.setViewKey('/', function () {
    command.iSearchForward();
}, 'Incremental search forward', true);

key.setViewKey('?', function (ev) {
    command.iSearchForwardKs(ev);
}, 'Emacs like incremental search forward', true);

key.setViewKey('C-o', function () {
    BrowserBack();
}, 'Back');

key.setViewKey('C-i', function () {
    BrowserForward();
}, 'Forward');

key.setViewKey('>', function (ev, arg) {
    var url = content.location.href;
    var pattern = /(.*)([0-9]+)([^0-9]*)$/;
    var digit = url.match(pattern);
    if (digit[1] && digit[2]) {
        let next = + digit[2] + (arg ? arg : 1);
        content.location.href = digit[1] + next + (digit[3] || "");
    }
}, 'Increment last digit in the URL');

key.setViewKey('<', function (ev, arg) {
    var url = content.location.href;
    var pattern = /(.*)([0-9]+)([^0-9]*)$/;
    var digit = url.match(pattern);
    if (digit[1] && digit[2]) {
        let next = + digit[2] - (arg ? arg : 1);
        content.location.href = digit[1] + next + (digit[3] || "");
    }
}, 'Decrement last digit in the URL');

key.setViewKey('\\', function () {
    var viewStyle = getMarkupDocumentViewer().authorStyleDisabled;
    if (viewStyle) {
        setStyleDisabled(false);
    } else {
        setStyleDisabled(true);
    }
}, 'Toggle CSS rendering');

key.setViewKey('H', function () {
    BrowserBack();
}, 'Back');

key.setViewKey('L', function () {
    BrowserForward();
}, 'Forward');

key.setViewKey('a', function () {
    PlacesCommandHook.bookmarkCurrentPage(true, PlacesUtils.bookmarksMenuFolderId);
}, 'Add bookmark here');

key.setViewKey('s', function () {
    BrowserStop();
}, 'Stop page loading');

key.setViewKey('n', function () {
    gFindBar.onFindAgainCommand(false);
}, 'Incremental search forward');

key.setViewKey('N', function () {
    gFindBar.onFindAgainCommand(true);
}, 'Incremental search backward');

key.setViewKey(['g', 'a'], function () {
    gBrowser.selectedTab = gBrowser.addTab("chrome://mozapps/content/extensions/extensions.xul");
}, 'Open Addons manager in new tab');

key.setViewKey(['g', 'A'], function () {
    gBrowser.selectedTab = gBrowser.addTab("chrome://mozapps/content/extensions/extensions.xul?type=extensions");
}, 'Open Addons manager (search mode) in new tab');

key.setViewKey(['g', 'b'], function () {
    PlacesCommandHook.showPlacesOrganizer("AllBookmarks");
}, 'Open bookmarks manager');

key.setViewKey(['g', 'c'], function () {
    gBrowser.selectedTab = gBrowser.addTab("about:config");
}, 'Open about:config in new tab');

key.setViewKey(['g', 'd'], function () {
    gBrowser.selectedTab = gBrowser.addTab("chrome://mozapps/content/downloads/downloads.xul");
}, 'Open downloads in new tab');

key.setViewKey(['g', 'm'], function () {
    gBrowser.selectedTab = gBrowser.addTab("chrome://greasemonkey/content/manage.xul");
}, 'Open grease monkey userscripts in new tab');

key.setViewKey(['g', 'p'], function () {
    openPreferences();
}, 'Open firefox preferences');

key.setViewKey('C-l', function () {
    wu = window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
    wu.redraw();
}, 'Redraw the screen');

key.setViewKey('C-r', function () {
    gBrowser.reloadAllTabs();
}, 'Reload all tabs');

key.setViewKey('w', function (ev) {
    window.open("about:blank");
}, 'Open new window');

key.setViewKey([']', 'f'], function (aEvent, aArg) {
    command.focusOtherFrame(aArg);
}, 'Focus next frame', true);

key.setViewKey(['C-k', 'k'], function () {
    key.listKeyBindings();
}, 'List all keybindings');

key.setViewKey(['C-k', 'r'], function () {
    userscript.reload();
}, 'Reload the initialization file');

key.setViewKey(['C-k', 'c'], function () {
    command.interpreter();
}, 'Command interpreter');

key.setViewKey(['C-k', 'x'], function (aEvent, aArg) {
    ext.select(aArg, aEvent);
}, 'List exts and execute selected one', true);

key.setEditKey('C-i', function (ev, arg) {
    ext.exec("edit_text", arg);
}, 'Edit in external editor', true);

key.setEditKey('C-h', function () {
    goDoCommand("cmd_deleteCharBackward");
}, 'Delete backward char');

key.setEditKey('C-e', function (aEvent) {
    command.endLine(aEvent);
}, 'End of the line');

key.setEditKey('C-a', function (aEvent) {
    command.beginLine(aEvent);
}, 'Beginning of the line');

key.setEditKey('C-f', function (aEvent) {
    command.nextChar(aEvent);
}, 'Forward char');

key.setEditKey('C-b', function (aEvent) {
    command.previousChar(aEvent);
}, 'Backward char');

key.setEditKey('C-w', function (ev) {
    command.deleteBackwardWord(ev);
}, 'Delete backward word');

key.setEditKey('C-u', function (aEvent) {
    command.selectAll(aEvent);
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DELETE, true);
}, 'Delete the line');

//key.setEditKey('ESC', function (ev) {
//    command.closeFindBar();
//    var elem = ev.originalTarget;
//    elem.blur();
//}, 'Exit edit mode');

key.setCaretKey('^', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectBeginLine") : goDoCommand("cmd_beginLine");
}, 'Move caret to the beginning of the line');

key.setCaretKey([['$'], ['G']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
}, 'Move caret to the end of the line');

key.setCaretKey('j', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectLineNext") : goDoCommand("cmd_scrollLineDown");
}, 'Move caret to the next line');

key.setCaretKey('k', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectLinePrevious") : goDoCommand("cmd_scrollLineUp");
}, 'Move caret to the previous line');

key.setCaretKey('l', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectCharNext") : goDoCommand("cmd_scrollRight");
}, 'Move caret to the right');

key.setCaretKey([['C-h'], ['h']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectCharPrevious") : goDoCommand("cmd_scrollLeft");
}, 'Move caret to the left');

key.setCaretKey('w', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectWordNext") : goDoCommand("cmd_wordNext");
}, 'Move caret to the right by word');

key.setCaretKey('W', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectWordPrevious") : goDoCommand("cmd_wordPrevious");
}, 'Move caret to the left by word');

key.setCaretKey('SPC', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectPageNext") : goDoCommand("cmd_movePageDown");
}, 'Move caret down by page');

key.setCaretKey('b', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectPagePrevious") : goDoCommand("cmd_movePageUp");
}, 'Move caret up by page');

key.setCaretKey(['g', 'g'], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectTop") : goDoCommand("cmd_scrollTop");
}, 'Move caret to the top of the page');

key.setCaretKey([['g', 't'], ['C-n']], function () {
    getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'Select next tab');

key.setCaretKey([['g', 'T'], ['C-p']], function () {
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'Select previous tab');

key.setCaretKey(['g', 'u'], function () {
    var uri = getBrowser().currentURI;
    if (uri.path == "/") {
        return;
    }
    var pathList = uri.path.split("/");
    if (!pathList.pop()) {
        pathList.pop();
    }
    loadURI(uri.prePath + pathList.join("/") + ("/"));
}, 'Go upper directory');

key.setCaretKey(['g', 'U'], function () {
    var uri = window._content.location.href;
    if (uri == null) {
        return;
    }
    var root = uri.match(/^[a-z]+:\/\/[^/]+\//);
    if (root) {
        loadURI(root, null, null);
    }
}, 'Go to the root directory');

key.setCaretKey('C-d', function () {
    util.getSelectionController().scrollLine(true);
}, 'Scroll line down');

key.setCaretKey('C-u', function () {
    util.getSelectionController().scrollLine(false);
}, 'Scroll line up');

key.setCaretKey(',', function () {
    util.getSelectionController().scrollHorizontal(true);
    goDoCommand("cmd_scrollLeft");
}, 'Scroll left');

key.setCaretKey('.', function () {
    goDoCommand("cmd_scrollRight");
    util.getSelectionController().scrollHorizontal(false);
}, 'Scroll right');

key.setCaretKey(':', function (aEvent, aArg) {
    ext.select(aArg, aEvent);
}, 'List exts and execute selected one', true);

key.setCaretKey('r', function () {
    BrowserReload();
}, 'Reload the page', true);

key.setCaretKey('H', function () {
    BrowserBack();
}, 'Back');

key.setCaretKey('L', function () {
    BrowserForward();
}, 'Forward');

key.setCaretKey('f', function (ev, arg) {
    ext.exec("hok-start-foreground-mode", arg);
}, 'Start foreground hint mode', true);

key.setCaretKey('F', function (ev, arg) {
    ext.exec("hok-start-background-mode", arg);
}, 'Start background hint mode', true);

key.setCaretKey(';', function (ev, arg) {
    ext.exec("hok-start-extended-mode", arg);
}, 'Start extended hint mode', true);

key.setCaretKey('d', function (ev) {
    document.dispatchEvent(key.stringToKeyEvent("C-w", true));
}, 'Close tab / window');

key.setCaretKey('u', function (ev) {
    document.dispatchEvent(key.stringToKeyEvent("C-T", true));
}, 'Undo closed tab');

key.setGlobalKey('M-:', function (ev, arg) {
    command.interpreter(ev, arg);
}, 'Eval', true);


