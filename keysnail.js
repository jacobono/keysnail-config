// ========================== KeySnail Init File =========================== //

// You can preserve your code in this area when generating the init file using GUI.
// Put all your code except special key, set*key, hook, blacklist.
// ========================================================================= //
//{{%PRESERVE%

// author:  thayer williams <thayerw.gmail.com>
// site:    http://cinderwick.ca/
// desc:    A vimperator-like keyboard config for KeySnail, a Firefox plugin
//          which provides Emacs/Vim-inspired keyboard control.
//          
//          More info at http://wiki.github.com/mooz/keysnail/

plugins.options["hok.hint_base_style"] = {
    position        : 'absolute',
    zIndex          : '2147483647',
    color           : '#000',
    fontFamily      : 'Arial',
    fontSize        : '.9em',
    lineHeight      : '.9em',
    fontWeight      : 'bold',
    padding         : '.15em .25em',
    margin          : '0px',
    textTransform   : 'uppercase',
    border          : '.05em solid #888',
	borderRadius    : '.2em',
	boxShadow       : '.1em .1em .2em #888'
};

plugins.options["hok.hint_color_link"]    = 'rgba(255, 230, 110, 1.0)';
plugins.options["hok.hint_color_form"]    = 'rgba(189, 231, 27, 1.0)';
plugins.options["hok.hint_color_focused"] = 'rgba(255, 151, 0, 1.0)';

key.setEditKey ('C-i', function (ev, arg) {
    ext.exec ( "edit_text", arg);
}, "Edit in external editor", true);

plugins.options [ "K2Emacs.editor"  ] = "/usr/bin/gvim -f";


//}}%PRESERVE%
// ========================================================================= //

// ========================= Special key settings ========================== //

key.quitKey              = "ESC";
key.helpKey              = "<f1>";
key.escapeKey            = "C-q";
key.macroStartKey        = "undefined";
key.macroEndKey          = "undefined";
key.universalArgumentKey = "undefined";
key.negativeArgument1Key = "undefined";
key.negativeArgument2Key = "undefined";
key.negativeArgument3Key = "undefined";
key.suspendKey           = "<f12>";

// ================================= Hooks ================================= //

hook.setHook('KeyBoardQuit', function (ev, aEvent) {

    // Ignore when the key sequence is typed
    if (key.currentKeySequence.length) {
        return;
    }

    // close the find bar
    command.closeFindBar();

    // Exit caret browsing
    util.setBoolPref("accessibility.browsewithcaret", false);

    if (util.isCaretEnabled()) {
        
        // escape any input fields and focus content
        let lastFocusedElem = document.commandDispatcher.focusedElement;
        if (lastFocusedElem) {
            lastFocusedElem.blur();
        }
        gBrowser.focus();
        _content.focus();

    } else {
        // deselect any highlighted text
        goDoCommand("cmd_selectNone");
    }
    if (KeySnail.windowType == "navigator:browser") {
        // standard ESC
        key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
    }
});

// ============================= Key bindings ============================== //

key.setGlobalKey('M-:', function (ev, arg) {
    command.interpreter(ev, arg);
}, 'Eval', true);

key.setGlobalKey(['C-k', 'c'], function () {
    command.interpreter();
}, 'Command interpreter');

key.setGlobalKey(['C-k', 'k'], function () {
    key.listKeyBindings();
}, 'List all keybindings');

key.setGlobalKey(['C-k', 'p'], function () {
    KeySnail.openPreference();
}, 'Load KeySnail preferences dialogue');

key.setGlobalKey(['C-k', 'r'], function () {
    userscript.reload();
}, 'Reload the initialization file');

key.setViewKey('C-b', function () {
    goDoCommand("cmd_scrollPageUp");
}, 'Scroll page up');

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

key.setViewKey('C-f', function () {
    goDoCommand("cmd_scrollPageDown");
}, 'Scroll page down');

key.setViewKey('C-g', function () {
    BrowserPageInfo();
}, 'Display page information');

key.setViewKey('C-T', function (aEvent) {
    prompt.read("E.gg Timer:", function (query) {
        if (window.loadURI) {
            getBrowser().selectedTab = getBrowser().addTab("http://e.ggtimer.com/" + encodeURIComponent(query));
        }
    });
}, 'E.gg Timer');

key.setViewKey(':', function (aEvent, aArg) {
    ext.select(aArg, aEvent);
}, 'List exts and execute selected one', true);

key.setGlobalKey(['C-k', 'x'], function (aEvent, aArg) {
    ext.select(aArg, aEvent);
}, 'List exts and execute selected one', true);

key.setViewKey('C-l', function () {
    wu = window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
    wu.redraw();
}, 'Redraw the screen');

key.setViewKey('C-r', function () {
    gBrowser.reloadAllTabs();
}, 'Reload all tabs');

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

key.setViewKey('a', function () {
    // set default destination to unsorted bookmarks
    PlacesCommandHook.bookmarkCurrentPage(true, PlacesUtils.unfiledMenuFolderId);
    // set default destination to bookmarks menu
    //PlacesCommandHook.bookmarkCurrentPage(true, PlacesUtils.bookmarksMenuFolderId);
}, 'Add bookmark here');

key.setViewKey('f', function (ev, arg) {
    ext.exec("hok-start-foreground-mode", arg);
}, 'Start foreground hint mode', true);

key.setViewKey('F', function (ev, arg) {
    ext.exec("hok-start-background-mode", arg);
}, 'Start background hint mode', true);

key.setViewKey('G', function () {
    goDoCommand("cmd_scrollBottom");
}, 'Scroll to the bottom of the page', true);

key.setViewKey('h', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_LEFT, true);
}, 'Scroll left');

key.setViewKey('H', function () {
    BrowserBack();
}, 'Back');

key.setViewKey('i', function () {
    util.setBoolPref("accessibility.browsewithcaret", true);
}, 'Toggle caret mode');

key.setViewKey('j', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
}, 'Scroll line down');

key.setViewKey([['J'], ['g', 'T']], function () {
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
    let elem = document.commandDispatcher.focusedElement;
    if (elem) elem.blur();
}, 'Select previous tab');

key.setViewKey('k', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
}, 'Scroll line up');

key.setViewKey([['K'], ['g', 't']], function () {
    getBrowser().mTabContainer.advanceSelectedTab(1, true);
    let elem = document.commandDispatcher.focusedElement;
    if (elem) elem.blur();
}, 'Select next tab');

key.setViewKey('l', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_RIGHT, true);
}, 'Scroll right');

key.setViewKey('L', function () {
    BrowserForward();
    //goDoCommand("Browser:Forward");
}, 'Forward');

key.setViewKey('n', function () {
    gFindBar.onFindAgainCommand(false);
}, 'Incremental search forward');

key.setViewKey('N', function () {
    gFindBar.onFindAgainCommand(true);
}, 'Incremental search backward');

key.setViewKey('o', function () {
    command.focusToById("urlbar");
}, 'Focus to the location bar', true);

key.setViewKey('O', function (aEvent) {
    command.focusToById("urlbar");
    command.endLine(aEvent);
}, 'Focus location bar and go to end of line');

key.setViewKey('p', function () {
    openUILink(command.getClipboardText());
}, 'Paste and Go in current tab');

key.setViewKey([['P'], ['g', 'P']], function () {
    gBrowser.selectedTab = gBrowser.addTab(command.getClipboardText());
}, 'Paste and Go in new tab');

key.setViewKey('r', function () {
    BrowserReload();
}, 'Reload the current page', true);

key.setViewKey('R', function () {
    BrowserReloadSkipCache();
}, 'Reload the current page (skipping cache)');

key.setViewKey('s', function () {
    BrowserStop();
}, 'Stop page loading');

key.setViewKey('t', function (ev) {
    BrowserOpenTab();
    //gBrowser.selectedTab = gBrowser.addTab("about:blank");
    //command.focusToById("urlbar");
}, 'Open a new tab');

key.setViewKey('T', function () {
    var url = window._content.location.href.toString();
    gBrowser.selectedTab = gBrowser.addTab("about:blank");
    command.focusToById("urlbar");
    command.insertText(url);
}, 'Open a new tab based on current URL');

key.setViewKey('w', function (ev) {
    window.open("about:blank");
}, 'Open a new window');

key.setViewKey('x', function (ev) {
    getBrowser().removeTab(getBrowser().selectedTab);
}, 'Close tab/window');

key.setViewKey('X', function (ev) {
    var r_ss = Cc['@mozilla.org/browser/sessionstore;1'].getService(Ci.nsISessionStore);
    if (r_ss.getClosedTabCount(window) > 0) {
        undoCloseTab();
    }
}, 'Undo closing of a tab');

key.setViewKey('y', function () {
    const gClipboardHelper = Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper);
    gClipboardHelper.copyString(window._content.location.href.toString());
}, 'yank (copy) current location');

key.setViewKey('Y', function () {
    goDoCommand("cmd_copy");
}, 'yank (copy) selected text');

key.setViewKey('{', function () {
    var browser = getBrowser();
    if (browser.mCurrentTab.previousSibling) {
        browser.moveTabTo(browser.mCurrentTab, browser.mCurrentTab._tPos - 1);
    } else {
        browser.moveTabTo(browser.mCurrentTab, browser.mTabContainer.childNodes.length - 1);
    }
}, 'Move tab left');
 
key.setViewKey('}', function () {
    var browser = getBrowser();
    if (browser.mCurrentTab.nextSibling) {
        browser.moveTabTo(browser.mCurrentTab, browser.mCurrentTab._tPos + 1);
    } else {
        browser.moveTabTo(browser.mCurrentTab, 0);
    }
}, 'Move tab right');

key.setViewKey('~', function () {
    var dirService = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
    var homeDirFile = dirService.get("Home", Components.interfaces.nsIFile);
    var homeDir = homeDirFile.path;
    gBrowser.selectedTab = gBrowser.addTab(homeDir);
}, 'Open home directory in new tab');

key.setViewKey(';', function (ev, arg) {
    ext.exec("hok-start-extended-mode", arg);
}, 'Start extended hint mode', true);

key.setViewKey('/', function () {
    command.iSearchForward();
}, 'Incremental search forward', true);

key.setViewKey('?', function (ev) {
    command.iSearchForwardKs(ev);
}, 'Emacs like incremental search forward', true);

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
        getMarkupDocumentViewer().authorStyleDisabled = false;
    } else {
        getMarkupDocumentViewer().authorStyleDisabled = true;
    }
}, 'Toggle CSS rendering for current page');

key.setViewKey([']', 'f'], function (aEvent, aArg) {
    command.focusOtherFrame(aArg);
}, 'Focus next frame', true);

key.setViewKey(['g', 'a'], function () {
    gBrowser.selectedTab = gBrowser.addTab("chrome://mozapps/content/extensions/extensions.xul");
}, 'Open Addons manager in new tab');

key.setViewKey(['g', 'b'], function () {
    //PlacesCommandHook.showPlacesOrganizer("AllBookmarks");
    //gBrowser.selectedTab = gBrowser.addTab("chrome://browser/content/bookmarks/bookmarksPanel.xul");
    gBrowser.selectedTab = gBrowser.addTab("chrome://browser/content/places/places.xul");
}, 'Open bookmarks manager in new tab');

key.setViewKey(['g', 'c'], function () {
    gBrowser.selectedTab = gBrowser.addTab("about:config");
}, 'Open about:config in new tab');

key.setViewKey(['g', 'd'], function () {
    gBrowser.selectedTab = gBrowser.addTab("chrome://mozapps/content/downloads/downloads.xul");
}, 'Open downloads in new tab');

key.setViewKey(['g', 'f'], function () {
    var key = "view_source.editor.external";
    util.setBoolPref(key, false);
    BrowserViewSourceOfDocument(content.document);
}, 'View page source');

key.setViewKey(['g', 'F'], function () {
    var key = "view_source.editor.external";
    util.setBoolPref(key, true);
    BrowserViewSourceOfDocument(content.document);
}, 'View page source in external editor');

key.setViewKey(['g', 'g'], function () {
    goDoCommand("cmd_scrollTop");
}, 'Scroll to the top of the page', true);

key.setViewKey(['g', 'h'], function () {
    var homepage = gHomeButton.getHomePage();
    openUILink(homepage);
}, 'Open homepage in current tab');

key.setViewKey(['g', 'H'], function () {
    var homepage = gHomeButton.getHomePage();
    gBrowser.selectedTab = gBrowser.addTab(homepage);
}, 'Open homepage in new background tab');

key.setViewKey(['g', 'i'], function () {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus first textarea', true);

key.setViewKey(['g', 'm'], function () {
    gBrowser.selectedTab = gBrowser.addTab("chrome://greasemonkey/content/manage.xul");
}, 'Open grease monkey userscripts in new tab');

key.setViewKey(['g', 'p'], function () {
    openPreferences();
}, 'Open firefox preferences');

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

key.setViewKey(['g', '$'], function () {
    document.dispatchEvent(key.stringToKeyEvent("M-9", true));
}, 'Go to the last tab');

key.setViewKey(['g', '0'], function () {
    document.dispatchEvent(key.stringToKeyEvent("M-1", true));
}, 'Go to the first tab');

key.setViewKey(['Z', 'Z'], function (ev) {
    util.setIntPref("browser.startup.page", 3);
    window.goQuitApplication();
}, 'Exit Firefox and save the session');

key.setViewKey(['Z', 'R'], function () {
    var appStartup = Cc['@mozilla.org/toolkit/app-startup;1'].getService(Ci.nsIAppStartup);
    appStartup.quit(appStartup.eRestart | appStartup.eAttemptQuit);
    Application.restart();
}, 'Restart Firefox');

key.setViewKey(['Z', 'Q'], function (ev) {
    util.setIntPref("browser.startup.page", 1);
    window.goQuitApplication();
}, 'Exit Firefox without saving the session');

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

key.setViewKey([['z', 'o'], ['-']], function () {
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

key.setViewKey([['z', 'z'], ['=']], function () {
    ZoomManager.reset();
}, 'Reset zoom');

key.setEditKey('C-a', function (aEvent) {
    command.beginLine(aEvent);
}, 'Go to beginning of the line');

key.setEditKey('C-b', function (aEvent) {
    command.previousChar(aEvent);
}, 'Move backward one char');

key.setEditKey('C-d', function () {
    goDoCommand("cmd_deleteCharForward");
}, 'Delete one char forward');

key.setEditKey('C-e', function (aEvent) {
    command.endLine(aEvent);
}, 'Go to end of the line');

key.setEditKey('C-f', function (aEvent) {
    command.nextChar(aEvent);
}, 'Move forward one char');

key.setEditKey('C-h', function () {
    goDoCommand("cmd_deleteCharBackward");
}, 'Delete one char backward');

key.setEditKey('C-i', function (ev, arg) {
    ext.exec("edit_text", arg);
}, 'Edit in external editor', true);

key.setEditKey('C-k', function (aEvent) {
    goDoCommand("cmd_deleteToEndOfLine");
}, 'Delete forward to end of line');

key.setEditKey('C-u', function (aEvent) {
    goDoCommand("cmd_selectBeginLine");
    goDoCommand("cmd_delete");
}, 'Delete the line from the beginning to point');

key.setEditKey('C-w', function (ev) {
    command.deleteBackwardWord(ev);
}, 'Delete backward word');

key.setCaretKey('0', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectBeginLine") : goDoCommand("cmd_beginLine");
}, 'Move caret to the beginning of the line');

key.setCaretKey('$', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
}, 'Move caret to the end of the line');

key.setCaretKey('i', function () {
    util.setBoolPref("accessibility.browsewithcaret", false);
}, 'Toggle caret mode');

key.setCaretKey('j', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectLineNext") : goDoCommand("cmd_scrollLineDown");
}, 'Move caret to the next line');

key.setCaretKey('k', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectLinePrevious") : goDoCommand("cmd_scrollLineUp");
}, 'Move caret to the previous line');

key.setCaretKey('l', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectCharNext") : goDoCommand("cmd_scrollRight");
}, 'Move caret to the right');

key.setCaretKey('h', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectCharPrevious") : goDoCommand("cmd_scrollLeft");
}, 'Move caret to the left');

key.setCaretKey('w', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectWordNext") : goDoCommand("cmd_wordNext");
}, 'Move caret to the right by word');

key.setCaretKey([['W'], ['b']], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectWordPrevious") : goDoCommand("cmd_wordPrevious");
}, 'Move caret to the left by word');

key.setCaretKey('SPC', function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectPageNext") : goDoCommand("cmd_movePageDown");
}, 'Move caret down by page');

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
