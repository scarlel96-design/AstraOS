(function initializeAstraShellStaticMock() {
  "use strict";

  const appState = {
    locale: "ko",
    route: "/desktop",
    activeWorkspaceId: "workspace-1",
    compactMode: false
  };

  function getMockData() {
    const data = window.ASTRA_SHELL_MOCK;
    if (!data || typeof data !== "object") {
      throw new Error("error.mockDataUnavailable");
    }
    return data;
  }

  function getString(key) {
    const data = getMockData();
    const localePack = data.strings && data.strings[appState.locale] ? data.strings[appState.locale] : {};
    const fallbackPack = data.strings && data.strings.ko ? data.strings.ko : {};
    return localePack[key] || fallbackPack[key] || key;
  }

  function safeText(value, fallback) {
    if (value === null || value === undefined) {
      return fallback || "";
    }
    return String(value);
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text !== undefined && text !== null) {
      element.textContent = safeText(text, "");
    }
    return element;
  }

  function getRouteDefinitions() {
    return getMockData().routes || [];
  }

  function normalizeRoute(routeValue) {
    const route = safeText(routeValue, "").replace(/^#/, "");
    const isAllowed = getRouteDefinitions().some(function routeMatches(routeDefinition) {
      return routeDefinition.path === route;
    });
    return isAllowed ? route : "/desktop";
  }

  function getRouteFromHash() {
    return normalizeRoute(window.location.hash || "/desktop");
  }

  function getRouteTitleKey(route) {
    const routeDefinition = getRouteDefinitions().find(function findRoute(routeItem) {
      return routeItem.path === route;
    });
    return routeDefinition ? routeDefinition.titleKey : "route.desktop.title";
  }

  function setRoute(route) {
    const nextRoute = normalizeRoute(route);
    appState.route = nextRoute;
    if (window.location.hash !== "#" + nextRoute) {
      window.location.hash = nextRoute;
    } else {
      renderApp(true);
    }
  }

  function createIconButton(labelKey, route, glyph, extraClass) {
    const label = getString(labelKey);
    const button = createElement("button", extraClass ? "icon-button " + extraClass : "icon-button");
    button.type = "button";
    button.dataset.route = route;
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
    button.appendChild(createElement("span", "icon-glyph", glyph));
    return button;
  }

  function createDesktopScene() {
    const scene = createElement("section", "astra-desktop");
    scene.setAttribute("aria-label", getString("route.desktop.title"));

    scene.appendChild(createWallpaper());
    scene.appendChild(createDesktopHeader());
    scene.appendChild(createDesktopCanvas());
    scene.appendChild(createRouteLayer(appState.route));
    scene.appendChild(createShellBar());
    return scene;
  }

  function createWallpaper() {
    const wallpaper = createElement("div", "wallpaper");
    wallpaper.setAttribute("aria-hidden", "true");
    wallpaper.appendChild(createElement("span", "wallpaper-bloom bloom-soft"));
    wallpaper.appendChild(createElement("span", "wallpaper-line line-one"));
    wallpaper.appendChild(createElement("span", "wallpaper-line line-two"));
    return wallpaper;
  }

  function createDesktopHeader() {
    const header = createElement("header", "desktop-header");
    const brand = createElement("button", "brand-chip");
    brand.type = "button";
    brand.dataset.route = "/desktop";
    brand.setAttribute("aria-label", getString("route.desktop.title"));
    brand.appendChild(createElement("span", "brand-mark", "A"));
    brand.appendChild(createElement("span", "brand-name", getString("app.name")));

    const signals = createElement("div", "system-signals");
    signals.setAttribute("aria-label", getString("shell.previewOnly"));
    signals.appendChild(createElement("span", "signal-dot signal-safe", ""));
    signals.appendChild(createElement("span", "signal-text", getString("shell.securityQuiet")));
    signals.appendChild(createElement("span", "signal-divider", ""));
    signals.appendChild(createElement("span", "signal-text", getString("shell.clock")));

    header.appendChild(brand);
    header.appendChild(signals);
    return header;
  }

  function createDesktopCanvas() {
    const canvas = createElement("section", "desktop-canvas");
    canvas.setAttribute("aria-label", getString("desktop.emptyTitle"));

    if (appState.route === "/desktop") {
      const quietNote = createElement("div", "quiet-desktop-note");
      quietNote.appendChild(createElement("h1", "", getString("desktop.emptyTitle")));
      quietNote.appendChild(createElement("p", "", getString("desktop.emptyBody")));
      canvas.appendChild(quietNote);

      const widgets = createElement("div", "desktop-widgets");
      const weatherWidget = createElement("article", "desktop-widget widget-weather");
      weatherWidget.appendChild(createElement("strong", "", getString("desktop.widgetWeather")));
      weatherWidget.appendChild(createElement("span", "", "24°"));
      weatherWidget.appendChild(createElement("p", "", getString("desktop.widgetBody")));
      widgets.appendChild(weatherWidget);

      const briefWidget = createElement("article", "desktop-widget widget-brief");
      briefWidget.appendChild(createElement("strong", "", getString("desktop.widgetBrief")));
      briefWidget.appendChild(createElement("span", "", getString("app.phase")));
      briefWidget.appendChild(createElement("p", "", getString("shell.previewOnly")));
      widgets.appendChild(briefWidget);
      canvas.appendChild(widgets);
    }

    return canvas;
  }

  function createRouteLayer(route) {
    const layer = createElement("section", "route-layer");
    layer.setAttribute("aria-label", getString(getRouteTitleKey(route)));

    if (route === "/launcher") {
      layer.appendChild(createLauncher());
    } else if (route === "/control-center") {
      layer.appendChild(createQuickPanel());
    } else if (route === "/notifications") {
      layer.appendChild(createNotificationCenter());
    } else if (route === "/settings") {
      layer.appendChild(createSettingsWindow());
    } else if (route === "/security-center") {
      layer.appendChild(createSecurityCenterWindow());
    } else if (route === "/app-center") {
      layer.appendChild(createAppCenterWindow());
    } else if (route === "/workspaces") {
      layer.appendChild(createWorkspaceView());
    } else if (route === "/login") {
      layer.appendChild(createSessionPreview());
    }

    return layer;
  }

  function createWindowFrame(title, className) {
    const windowElement = createElement("section", "app-window " + className);
    windowElement.setAttribute("aria-label", title);

    const chrome = createElement("div", "window-chrome");
    chrome.appendChild(createElement("strong", "window-title", title));

    const controls = createElement("div", "window-controls");
    [
      { key: "window.minimize", mark: "-" },
      { key: "window.maximize", mark: "+" },
      { key: "window.close", mark: "x" }
    ].forEach(function appendControl(control) {
      const button = createElement("button", "window-control", control.mark);
      button.type = "button";
      button.disabled = true;
      button.setAttribute("aria-label", getString(control.key));
      controls.appendChild(button);
    });
    chrome.appendChild(controls);
    windowElement.appendChild(chrome);
    return windowElement;
  }

  function createLauncher() {
    const data = getMockData();
    const launcher = createWindowFrame(getString("route.launcher.title"), "launcher-window");

    const search = createElement("input", "launcher-search");
    search.type = "search";
    search.disabled = true;
    search.placeholder = getString("shell.searchPlaceholder");
    search.setAttribute("aria-label", getString("shell.searchPlaceholder"));
    launcher.appendChild(search);

    launcher.appendChild(createSectionTitle("launcher.pinned"));
    const appGrid = createElement("div", "launcher-grid");
    data.launcherApps.forEach(function appendApp(app) {
      const tile = createElement("button", "launcher-tile");
      tile.type = "button";
      tile.dataset.route = app.route;
      tile.setAttribute("aria-label", getString(app.titleKey));
      tile.appendChild(createElement("span", "tile-icon", app.glyph));
      tile.appendChild(createElement("span", "tile-label", getString(app.titleKey)));
      appGrid.appendChild(tile);
    });
    launcher.appendChild(appGrid);

    launcher.appendChild(createSectionTitle("launcher.recent"));
    const recent = createElement("div", "recent-list");
    data.recentItems.forEach(function appendRecent(item) {
      const button = createElement("button", "recent-item");
      button.type = "button";
      button.dataset.route = item.route;
      button.setAttribute("aria-label", getString(item.titleKey));
      button.appendChild(createElement("strong", "", getString(item.titleKey)));
      button.appendChild(createElement("span", "", getString(item.bodyKey)));
      recent.appendChild(button);
    });
    launcher.appendChild(recent);
    return launcher;
  }

  function createQuickPanel() {
    const panel = createWindowFrame(getString("route.controlCenter.title"), "quick-panel side-sheet");
    const grid = createElement("div", "quick-grid");
    getMockData().quickSettings.forEach(function appendToggle(item) {
      const button = createElement("button", item.active ? "quick-toggle is-active" : "quick-toggle");
      button.type = "button";
      button.dataset.action = "mock-toggle";
      button.setAttribute("aria-pressed", item.active ? "true" : "false");
      button.setAttribute("aria-label", getString(item.titleKey));
      button.appendChild(createElement("span", "quick-toggle-icon", item.glyph || ""));
      const copy = createElement("span", "quick-toggle-copy");
      copy.appendChild(createElement("span", "quick-toggle-label", getString(item.titleKey)));
      copy.appendChild(createElement("strong", "quick-toggle-value", item.value));
      button.appendChild(copy);
      grid.appendChild(button);
    });
    panel.appendChild(grid);
    return panel;
  }

  function createNotificationCenter() {
    const panel = createWindowFrame(getString("route.notifications.title"), "notification-center side-sheet");
    const list = createElement("div", "notification-list");
    getMockData().notifications.forEach(function appendNotification(notification) {
      const item = createElement("article", "notification-card");
      item.appendChild(createElement("span", "notification-source", getString(notification.sourceKey)));
      item.appendChild(createElement("strong", "", getString(notification.titleKey)));
      item.appendChild(createElement("p", "", getString(notification.bodyKey)));
      list.appendChild(item);
    });
    panel.appendChild(list);
    return panel;
  }

  function createSettingsWindow() {
    const frame = createWindowFrame(getString("route.settings.title"), "settings-window");
    frame.appendChild(createElement("p", "window-copy", getString("settings.copy")));
    const list = createElement("div", "settings-list");
    getMockData().settingsSections.forEach(function appendSection(section) {
      const row = createElement("article", "settings-row");
      row.appendChild(createElement("strong", "", getString(section.titleKey)));
      row.appendChild(createElement("span", "", section.value));
      list.appendChild(row);
    });
    frame.appendChild(list);
    return frame;
  }

  function createSecurityCenterWindow() {
    const frame = createWindowFrame(getString("route.securityCenter.title"), "security-window");
    const summary = createElement("section", "security-summary");
    summary.appendChild(createElement("span", "large-status-dot", ""));
    const copy = createElement("div", "");
    copy.appendChild(createElement("h2", "", getString("security.summary")));
    copy.appendChild(createElement("p", "", getString("security.copy")));
    summary.appendChild(copy);
    frame.appendChild(summary);

    const list = createElement("div", "security-list");
    getMockData().securityItems.forEach(function appendItem(item) {
      const row = createElement("article", "security-row");
      row.appendChild(createElement("strong", "", getString(item.titleKey)));
      row.appendChild(createElement("p", "", getString(item.bodyKey)));
      row.appendChild(createElement("span", "subtle-state", getString(item.stateKey)));
      list.appendChild(row);
    });
    frame.appendChild(list);
    return frame;
  }

  function createAppCenterWindow() {
    const frame = createWindowFrame(getString("route.appCenter.title"), "app-center-window");
    frame.appendChild(createElement("p", "window-copy", getString("appCenter.copy")));
    const list = createElement("div", "app-center-list");
    getMockData().appCenterItems.forEach(function appendApp(app) {
      const item = createElement("article", "app-center-item");
      item.appendChild(createElement("span", "tile-icon", app.glyph));
      const copy = createElement("div", "app-copy");
      copy.appendChild(createElement("strong", "", app.name));
      copy.appendChild(createElement("span", "", getString(app.categoryKey)));
      item.appendChild(copy);
      item.appendChild(createElement("span", "compat-pill", getString(app.statusKey)));
      list.appendChild(item);
    });
    frame.appendChild(list);
    return frame;
  }

  function createWorkspaceView() {
    const overlay = createElement("section", "workspace-view");
    overlay.appendChild(createElement("h1", "", getString("workspace.title")));

    const snapPreview = createElement("section", "snap-preview");
    const snapCopy = createElement("div", "snap-copy");
    snapCopy.appendChild(createElement("strong", "", getString("workspace.snapTitle")));
    snapCopy.appendChild(createElement("p", "", getString("workspace.snapBody")));
    snapPreview.appendChild(snapCopy);
    const snapGrid = createElement("div", "snap-grid");
    ["snap-large", "snap-stack", "snap-stack", "snap-wide"].forEach(function appendSnapCell(cellClass) {
      snapGrid.appendChild(createElement("span", "snap-cell " + cellClass, ""));
    });
    snapPreview.appendChild(snapGrid);
    overlay.appendChild(snapPreview);

    const grid = createElement("div", "workspace-grid");
    getMockData().workspaces.forEach(function appendWorkspace(workspace) {
      const card = createElement("button", workspace.id === appState.activeWorkspaceId ? "workspace-card is-active" : "workspace-card");
      card.type = "button";
      card.dataset.action = "workspace";
      card.dataset.workspaceId = workspace.id;
      card.setAttribute("aria-label", getString(workspace.titleKey));
      card.appendChild(createElement("strong", "", getString(workspace.titleKey)));
      const preview = createElement("span", "workspace-preview");
      workspace.windows.forEach(function appendWindowPreview(windowKey) {
        preview.appendChild(createElement("span", "", getString(windowKey)));
      });
      if (workspace.windows.length === 0) {
        preview.appendChild(createElement("span", "empty-workspace", getString("desktop.emptyTitle")));
      }
      card.appendChild(preview);
      grid.appendChild(card);
    });
    overlay.appendChild(grid);
    return overlay;
  }

  function createSessionPreview() {
    const frame = createWindowFrame(getString("route.login.title"), "session-window");
    frame.appendChild(createElement("p", "window-copy", getString("desktop.emptyBody")));
    const button = createElement("button", "primary-action", getString("route.desktop.title"));
    button.type = "button";
    button.dataset.route = "/desktop";
    frame.appendChild(button);
    return frame;
  }

  function createSectionTitle(key) {
    return createElement("h2", "section-title", getString(key));
  }

  function createShellBar() {
    const data = getMockData();
    const bar = createElement("nav", "shell-bar");
    bar.setAttribute("aria-label", getString("app.name"));

    bar.appendChild(createIconButton("shell.launcher", "/launcher", "A", "launcher-button"));

    const apps = createElement("div", "shell-apps");
    data.shellBarApps.forEach(function appendApp(app) {
      const button = createIconButton(app.titleKey, app.route, app.glyph, "shell-app-button");
      if (app.running) {
        button.appendChild(createElement("span", "running-indicator", ""));
      }
      apps.appendChild(button);
    });
    bar.appendChild(apps);

    const tray = createElement("div", "shell-tray");
    tray.appendChild(createIconButton("shell.quickPanel", "/control-center", "Q", "tray-button"));
    tray.appendChild(createNotificationButton());
    tray.appendChild(createIconButton("shell.workspace", "/workspaces", "W", "tray-button"));
    tray.appendChild(createElement("span", "clock", getString("shell.clock")));
    bar.appendChild(tray);
    return bar;
  }

  function createNotificationButton() {
    const button = createIconButton("shell.notifications", "/notifications", "N", "tray-button notification-button");
    button.appendChild(createElement("span", "notification-count", safeText(getMockData().notifications.length, "0")));
    return button;
  }

  function updateActiveRouteState(root) {
    root.querySelectorAll("[data-route]").forEach(function updateButton(button) {
      const route = normalizeRoute(button.getAttribute("data-route"));
      button.classList.toggle("is-active", route === appState.route);
      if (route === appState.route) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  function renderApp(focusScreen) {
    const root = document.getElementById("screen-root");
    if (!root) {
      return;
    }
    root.replaceChildren(createDesktopScene());
    root.dataset.route = appState.route;
    updateActiveRouteState(root);
    document.documentElement.lang = appState.locale === "en" ? "en" : "ko";

    if (focusScreen) {
      try {
        root.focus({ preventScroll: true });
      } catch (error) {
        root.focus();
      }
    }
  }

  function showToast(messageKey) {
    const toastRoot = document.getElementById("toast-root");
    if (!toastRoot) {
      return;
    }
    const toast = createElement("div", "toast", getString(messageKey));
    toast.setAttribute("role", "status");
    toastRoot.replaceChildren(toast);
    window.setTimeout(function clearToast() {
      if (toast.parentNode === toastRoot) {
        toastRoot.replaceChildren();
      }
    }, 2200);
  }

  function handleClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) {
      return;
    }

    const routeButton = target.closest("[data-route]");
    if (routeButton) {
      setRoute(routeButton.getAttribute("data-route"));
      showToast("toast.mockRoute");
      return;
    }

    const actionButton = target.closest("[data-action]");
    if (!actionButton) {
      return;
    }

    if (actionButton.getAttribute("data-action") === "mock-toggle") {
      showToast("toast.mockToggle");
    } else if (actionButton.getAttribute("data-action") === "workspace") {
      const workspaceId = actionButton.getAttribute("data-workspace-id");
      if (workspaceId) {
        appState.activeWorkspaceId = workspaceId;
        renderApp(false);
        showToast("toast.mockRoute");
      }
    }
  }

  function initializeApp() {
    try {
      appState.route = getRouteFromHash();
      document.addEventListener("click", handleClick);
      window.addEventListener("hashchange", function handleHashChange() {
        appState.route = getRouteFromHash();
        renderApp(true);
      });
      renderApp(false);
    } catch (error) {
      const root = document.getElementById("screen-root");
      if (root) {
        const fallback = error instanceof Error && error.message === "error.mockDataUnavailable"
          ? "Astra Shell mock data를 사용할 수 없습니다. / Astra Shell mock data is not available."
          : "정적 mock 초기화 오류가 발생했습니다. / Static mock initialization failed.";
        root.replaceChildren(createElement("div", "empty-state", fallback));
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }
})();
