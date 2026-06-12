(function initializeAstraShellStaticMock() {
  "use strict";

  const allowedRoutes = [
    "/login",
    "/desktop",
    "/dock",
    "/launcher",
    "/control-center",
    "/notifications",
    "/workspaces",
    "/settings",
    "/security-center"
  ];

  const appState = {
    locale: "ko",
    route: "/login",
    activeWorkspaceId: "workspace-1",
    dismissedNotificationIds: new Set(),
    quickSettings: {
      focusMode: false,
      lowResourceMode: false,
      performanceMode: "balancedPremium"
    }
  };

  function getMockData() {
    const mockData = window.ASTRA_SHELL_MOCK;
    if (!mockData || typeof mockData !== "object") {
      throw new Error("error.mockDataUnavailable");
    }
    return mockData;
  }

  function getElementById(elementId) {
    if (!elementId) {
      return null;
    }
    return document.getElementById(elementId);
  }

  function getString(key) {
    const mockData = getMockData();
    const localePack = mockData.strings && mockData.strings[appState.locale] ? mockData.strings[appState.locale] : {};
    const fallbackPack = mockData.strings && mockData.strings.ko ? mockData.strings.ko : {};
    return localePack[key] || fallbackPack[key] || key;
  }

  function safeText(value, fallbackValue) {
    if (value === null || value === undefined) {
      return fallbackValue || "";
    }
    return String(value);
  }

  function normalizeRoute(routeValue) {
    const route = safeText(routeValue, "").replace(/^#/, "");
    if (allowedRoutes.includes(route)) {
      return route;
    }
    return "/login";
  }

  function getRouteFromHash() {
    return normalizeRoute(window.location.hash || "/login");
  }

  function createElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (textContent !== undefined && textContent !== null) {
      element.textContent = safeText(textContent, "");
    }
    return element;
  }

  function createTag(textContent, modifierClass) {
    const tag = createElement("span", modifierClass ? "tag " + modifierClass : "tag", textContent);
    return tag;
  }

  function createActionButton(label, route, extraClass) {
    const button = createElement("button", extraClass ? "action-button " + extraClass : "action-button", label);
    button.type = "button";
    button.dataset.route = route;
    button.setAttribute("aria-label", label);
    return button;
  }

  function createDisabledAction(label) {
    const button = createElement("button", "action-button", label);
    button.type = "button";
    button.disabled = true;
    button.dataset.mockDisabled = "true";
    button.setAttribute("aria-label", label);
    return button;
  }

  function createPanel(title, copy, extraClass) {
    const panel = createElement("article", extraClass ? "panel " + extraClass : "panel");
    const titleElement = createElement("h3", "panel-title", title);
    panel.appendChild(titleElement);
    if (copy) {
      panel.appendChild(createElement("p", "panel-copy", copy));
    }
    return panel;
  }

  function createBoundaryList() {
    const list = createElement("ul", "mock-list");
    [
      "security.noRealLogin",
      "security.noPrivilege",
      "security.noOsCommand",
      "security.noNativeBridge",
      "security.noUserFiles",
      "security.noSecurityScan"
    ].forEach(function appendBoundaryItem(key) {
      const item = createElement("li", "mock-list-item");
      item.appendChild(createElement("p", "list-title", getString(key)));
      item.appendChild(createElement("p", "list-copy", getString("security.mockDataOnly")));
      list.appendChild(item);
    });
    return list;
  }

  function createScreenShell(titleKey, descriptionKey) {
    const screen = createElement("div", "screen");
    const hero = createElement("section", "screen-hero");
    const titleId = "screen-title-" + titleKey.replace(/[^a-zA-Z0-9]+/g, "-");
    hero.setAttribute("aria-labelledby", titleId);
    hero.appendChild(createElement("p", "eyebrow", getString("app.phase")));
    const title = createElement("h2", "screen-title", getString(titleKey));
    title.id = titleId;
    hero.appendChild(title);
    hero.appendChild(createElement("p", "screen-description", getString(descriptionKey)));

    const tagRow = createElement("div", "tag-row");
    tagRow.appendChild(createTag(getString("status.localOnly"), "tag-safe"));
    tagRow.appendChild(createTag(getString("status.mockOnly"), "tag"));
    tagRow.appendChild(createTag(getString("status.noBridge"), "tag-danger"));
    tagRow.appendChild(createTag(getString("status.noStorage"), "tag-info"));
    hero.appendChild(tagRow);

    screen.appendChild(hero);
    return screen;
  }

  function getVisibleNotificationCount() {
    const mockData = getMockData();
    return mockData.notifications.filter(function keepVisibleNotification(notification) {
      return !appState.dismissedNotificationIds.has(notification.id);
    }).length;
  }

  function createMetricCard(labelKey, value) {
    const card = createElement("article", "metric-card");
    card.appendChild(createElement("p", "eyebrow", getString(labelKey)));
    card.appendChild(createElement("strong", "metric-value", value));
    return card;
  }

  function getAppInitial(label) {
    const normalizedLabel = safeText(label, "A").trim();
    return normalizedLabel.length > 0 ? normalizedLabel.slice(0, 1).toUpperCase() : "A";
  }

  function renderLoginScreen() {
    const mockData = getMockData();
    const screen = createScreenShell("login.title", "login.description");
    const grid = createElement("section", "grid-two");

    const userPanel = createPanel(mockData.currentUser.displayName, getString("security.noRealLogin"), "prominent");
    const input = createElement("input", "mock-input");
    input.type = "password";
    input.disabled = true;
    input.placeholder = getString("login.passwordPlaceholder");
    input.setAttribute("aria-label", getString("login.passwordPlaceholder"));
    userPanel.appendChild(input);

    const actionRow = createElement("div", "action-row");
    actionRow.appendChild(createActionButton(getString("action.mockLogin"), "/desktop", "primary"));
    actionRow.appendChild(createDisabledAction(getString("action.disabled")));
    userPanel.appendChild(actionRow);

    const boundaryPanel = createPanel(getString("section.boundaries"), getString("security.boundaryBody"));
    boundaryPanel.appendChild(createBoundaryList());

    grid.appendChild(userPanel);
    grid.appendChild(boundaryPanel);
    screen.appendChild(grid);
    return screen;
  }

  function renderDesktopScreen() {
    const mockData = getMockData();
    const screen = createScreenShell("route.desktop.title", "desktop.description");
    const overview = createElement("section", "desktop-overview");
    overview.setAttribute("aria-label", getString("section.systemSignals"));
    overview.appendChild(createMetricCard("metric.routes", safeText(mockData.routes.length, "0")));
    overview.appendChild(createMetricCard("metric.notifications", safeText(getVisibleNotificationCount(), "0")));
    overview.appendChild(createMetricCard("metric.workspaces", safeText(mockData.workspaces.length, "0")));
    overview.appendChild(createMetricCard("metric.storage", getString("metric.none")));
    screen.appendChild(overview);

    const grid = createElement("section", "grid-two");

    const windowsPanel = createPanel(getString("section.mockWindows"), getString("security.mockDataOnly"));
    const windowList = createElement("ul", "mock-list");
    mockData.runningApps.forEach(function appendMockWindow(app) {
      const item = createElement("li", "mock-list-item");
      item.appendChild(createElement("p", "list-title", getString(app.windowTitleKey)));
      item.appendChild(createElement("p", "list-copy", safeText(app.state, "mock")));
      windowList.appendChild(item);
    });
    windowsPanel.appendChild(windowList);

    const actionPanel = createPanel(getString("section.quickActions"), getString("notice.rollback"));
    const actionRow = createElement("div", "action-row");
    actionRow.appendChild(createActionButton(getString("action.openLauncher"), "/launcher", "primary"));
    actionRow.appendChild(createActionButton(getString("action.openControlCenter"), "/control-center"));
    actionRow.appendChild(createActionButton(getString("action.openNotifications"), "/notifications"));
    actionRow.appendChild(createActionButton(getString("action.openWorkspaces"), "/workspaces"));
    actionPanel.appendChild(actionRow);

    grid.appendChild(windowsPanel);
    grid.appendChild(actionPanel);
    screen.appendChild(grid);
    screen.appendChild(createDockPreview());
    return screen;
  }

  function createDockPreview() {
    const mockData = getMockData();
    const dock = createElement("section", "dock-preview");
    dock.setAttribute("aria-label", getString("section.pinnedApps"));
    mockData.pinnedApps.forEach(function appendPinnedApp(app) {
      const button = createElement("button", "dock-button", getString(app.labelKey));
      button.type = "button";
      button.dataset.route = app.opensRoute;
      button.setAttribute("aria-label", getString(app.labelKey));
      dock.appendChild(button);
    });
    return dock;
  }

  function renderDockScreen() {
    const screen = createScreenShell("route.dock.title", "dock.description");
    const panel = createPanel(getString("section.pinnedApps"), getString("security.noOsCommand"));
    panel.appendChild(createDockPreview());
    screen.appendChild(panel);
    return screen;
  }

  function renderLauncherScreen() {
    const mockData = getMockData();
    const screen = createScreenShell("route.launcher.title", "launcher.description");
    const grid = createElement("section", "app-grid");
    grid.setAttribute("aria-label", getString("section.pinnedApps"));

    mockData.pinnedApps.forEach(function appendLauncherCard(app) {
      const label = getString(app.labelKey);
      const panel = createPanel(label, getString("security.noOsCommand"), "app-card");
      panel.insertBefore(createElement("span", "app-initial", getAppInitial(label)), panel.firstChild);
      const actionRow = createElement("div", "action-row");
      actionRow.appendChild(createActionButton(label, app.opensRoute, "primary"));
      actionRow.appendChild(createDisabledAction(getString("action.disabled")));
      panel.appendChild(actionRow);
      grid.appendChild(panel);
    });

    screen.appendChild(grid);
    return screen;
  }

  function renderControlCenterScreen() {
    const mockData = getMockData();
    const screen = createScreenShell("route.controlCenter.title", "controlCenter.description");
    const grid = createElement("section", "grid-two");
    const quickPanel = createPanel(getString("section.quickSettings"), getString("security.noOsCommand"), "prominent");
    const toggleGrid = createElement("div", "toggle-grid");

    toggleGrid.appendChild(createToggleButton("status.localOnly", true, true));
    toggleGrid.appendChild(createToggleButton("control.focusMode", appState.quickSettings.focusMode, false, "focusMode"));
    toggleGrid.appendChild(createToggleButton("status.lowResource", appState.quickSettings.lowResourceMode, false, "lowResourceMode"));
    toggleGrid.appendChild(createToggleButton("status.balancedPremium", appState.quickSettings.performanceMode === "balancedPremium", false, "performanceMode"));
    quickPanel.appendChild(toggleGrid);

    const metricPanel = createPanel(getString("status.previewOnly"), getString("security.boundaryBody"));
    metricPanel.appendChild(createRangeRow("control.brightness", mockData.quickSettings.brightness));
    metricPanel.appendChild(createRangeRow("control.volume", mockData.quickSettings.volume));
    metricPanel.appendChild(createDisabledAction(getString("action.disabled")));

    grid.appendChild(quickPanel);
    grid.appendChild(metricPanel);
    screen.appendChild(grid);
    return screen;
  }

  function createToggleButton(labelKeyOrText, isActive, isLocked, settingKey) {
    const label = getString(labelKeyOrText);
    const button = createElement("button", isActive ? "toggle-button is-active" : "toggle-button");
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    button.appendChild(createElement("strong", "", label));
    button.appendChild(createElement("span", "", isLocked ? getString("status.disabledByDesign") : getString("status.mockOnly")));
    if (isLocked) {
      button.disabled = true;
    } else if (settingKey) {
      button.dataset.action = "toggle-setting";
      button.dataset.settingKey = settingKey;
    }
    return button;
  }

  function createRangeRow(labelKey, value) {
    const row = createElement("label", "range-row");
    const label = getString(labelKey);
    row.appendChild(createElement("span", "", label + " " + safeText(value, "0") + "%"));
    const input = createElement("input", "");
    input.type = "range";
    input.min = "0";
    input.max = "100";
    input.value = safeText(value, "0");
    input.disabled = true;
    input.setAttribute("aria-label", label);
    row.appendChild(input);
    return row;
  }

  function renderNotificationsScreen() {
    const mockData = getMockData();
    const screen = createScreenShell("route.notifications.title", "notifications.description");
    const panel = createPanel(getString("section.notificationQueue"), getString("security.mockDataOnly"), "prominent");
    const visibleNotifications = mockData.notifications.filter(function keepVisibleNotification(notification) {
      return !appState.dismissedNotificationIds.has(notification.id);
    });

    if (visibleNotifications.length === 0) {
      panel.appendChild(createElement("div", "empty-state", getString("empty.notifications")));
    } else {
      const actionRow = createElement("div", "action-row");
      const dismissAll = createElement("button", "action-button", getString("action.dismissAllNotifications"));
      dismissAll.type = "button";
      dismissAll.dataset.action = "dismiss-all-notifications";
      actionRow.appendChild(dismissAll);
      panel.appendChild(actionRow);

      const list = createElement("ul", "notification-list");
      visibleNotifications.forEach(function appendNotification(notification) {
        const severity = safeText(notification.severity, "info");
        const item = createElement("li", "notification-item severity-" + severity);
        item.appendChild(createElement("span", "notification-severity"));
        const content = createElement("div", "notification-content");
        const meta = createElement("div", "notification-meta");
        meta.appendChild(createTag(getString(notification.sourceKey), severity === "warn" ? "tag-warn" : "tag-info"));
        meta.appendChild(createTag(getString("status.previewOnly"), "tag-danger"));
        content.appendChild(meta);
        content.appendChild(createElement("p", "list-title", getString(notification.titleKey)));
        content.appendChild(createElement("p", "list-copy", getString(notification.bodyKey)));
        const dismiss = createElement("button", "action-button", getString("action.dismissNotification"));
        dismiss.type = "button";
        dismiss.dataset.action = "dismiss-notification";
        dismiss.dataset.notificationId = notification.id;
        content.appendChild(dismiss);
        item.appendChild(content);
        list.appendChild(item);
      });
      panel.appendChild(list);
    }

    screen.appendChild(panel);
    return screen;
  }

  function renderWorkspaceScreen() {
    const mockData = getMockData();
    const screen = createScreenShell("route.workspaces.title", "workspaces.description");
    const grid = createElement("section", "workspace-grid");

    mockData.workspaces.forEach(function appendWorkspace(workspace) {
      const isActive = appState.activeWorkspaceId === workspace.id;
      const card = createElement("button", isActive ? "workspace-card is-active" : "workspace-card");
      card.type = "button";
      card.dataset.action = "switch-workspace";
      card.dataset.workspaceId = workspace.id;
      card.setAttribute("aria-pressed", isActive ? "true" : "false");
      card.setAttribute("aria-label", getString(workspace.labelKey));
      card.appendChild(createElement("strong", "", getString(workspace.labelKey)));
      card.appendChild(createElement("span", "", formatWindowCount(workspace.windowCount)));
      const preview = createElement("span", "workspace-preview");
      preview.appendChild(createElement("span", ""));
      preview.appendChild(createElement("span", ""));
      card.appendChild(preview);
      grid.appendChild(card);
    });

    screen.appendChild(grid);
    return screen;
  }

  function renderSettingsScreen() {
    const screen = createScreenShell("route.settings.title", "settings.description");
    const grid = createElement("section", "grid-three");
    [
      getString("status.localOnly"),
      getString("status.balancedPremium"),
      getString("module.aiStudio"),
      getString("module.privateWorkspace"),
      getString("section.boundaries"),
      getString("status.previewOnly")
    ].forEach(function appendSettingsPanel(title) {
      const panel = createPanel(title, getString("security.noPrivilege"));
      panel.appendChild(createDisabledAction(getString("action.disabled")));
      grid.appendChild(panel);
    });
    screen.appendChild(grid);
    return screen;
  }

  function renderSecurityCenterScreen() {
    const screen = createScreenShell("route.securityCenter.title", "securityCenter.description");
    const grid = createElement("section", "grid-three");
    grid.setAttribute("aria-label", getString("section.securityModules"));

    [
      { titleKey: "module.shield", copyKey: "notice.shield", tagClass: "tag-safe", stateClass: "safe" },
      { titleKey: "module.guardian", copyKey: "notice.guardian", tagClass: "tag-safe", stateClass: "safe" },
      { titleKey: "module.vault", copyKey: "security.noUserFiles", tagClass: "tag-warn", stateClass: "warn" },
      { titleKey: "module.secureDelete", copyKey: "notice.secureDelete", tagClass: "tag-warn", stateClass: "warn" },
      { titleKey: "module.aiStudio", copyKey: "notice.aiStudio", tagClass: "tag-info", stateClass: "info" },
      { titleKey: "module.privateWorkspace", copyKey: "notice.rollback", tagClass: "tag-info", stateClass: "info" }
    ].forEach(function appendSecurityModule(moduleItem) {
      const panel = createPanel(getString(moduleItem.titleKey), getString(moduleItem.copyKey), "security-module " + moduleItem.stateClass);
      const tagRow = createElement("div", "tag-row");
      tagRow.appendChild(createTag(getString("status.mockOnly"), moduleItem.tagClass));
      tagRow.appendChild(createTag(getString("status.previewOnly"), "tag-danger"));
      panel.appendChild(tagRow);
      const signalRow = createElement("div", "module-signal-row");
      signalRow.appendChild(createModuleSignal("status.localOnly", "status.noStorage"));
      signalRow.appendChild(createModuleSignal("status.reducedMotionAware", "status.mockOnly"));
      panel.appendChild(signalRow);
      panel.appendChild(createDisabledAction(getString("action.disabled")));
      grid.appendChild(panel);
    });

    screen.appendChild(grid);
    return screen;
  }

  function createModuleSignal(titleKey, bodyKey) {
    const signal = createElement("span", "module-signal");
    signal.appendChild(createElement("strong", "", getString(titleKey)));
    signal.appendChild(createElement("span", "", getString(bodyKey)));
    return signal;
  }

  function renderScreenForRoute(route) {
    switch (route) {
      case "/login":
        return renderLoginScreen();
      case "/desktop":
        return renderDesktopScreen();
      case "/dock":
        return renderDockScreen();
      case "/launcher":
        return renderLauncherScreen();
      case "/control-center":
        return renderControlCenterScreen();
      case "/notifications":
        return renderNotificationsScreen();
      case "/workspaces":
        return renderWorkspaceScreen();
      case "/settings":
        return renderSettingsScreen();
      case "/security-center":
        return renderSecurityCenterScreen();
      default:
        return renderLoginScreen();
    }
  }

  function formatWindowCount(windowCount) {
    const count = safeText(windowCount, "0");
    if (appState.locale === "ko") {
      return getString("workspace.windowUnit") + " " + count + "개";
    }
    return count + " " + getString("workspace.windowUnit");
  }

  function updateStaticText() {
    document.querySelectorAll("[data-i18n]").forEach(function updateNode(node) {
      const key = node.getAttribute("data-i18n");
      if (key) {
        node.textContent = getString(key);
      }
    });
  }

  function updateRouteButtons() {
    document.querySelectorAll("[data-route]").forEach(function updateButton(button) {
      const route = normalizeRoute(button.getAttribute("data-route"));
      button.classList.toggle("is-active", route === appState.route);
      if (button.classList.contains("route-button")) {
        button.setAttribute("aria-current", route === appState.route ? "page" : "false");
        button.setAttribute("aria-label", getString(getRouteTitleKey(route)));
      }
    });
  }

  function getRouteTitleKey(route) {
    const mockData = getMockData();
    const routeDefinition = mockData.routes.find(function findRoute(routeItem) {
      return routeItem.path === route;
    });
    return routeDefinition ? routeDefinition.titleKey : "app.name";
  }

  function updateLanguageButtons() {
    document.querySelectorAll("[data-locale]").forEach(function updateButton(button) {
      const locale = button.getAttribute("data-locale");
      button.classList.toggle("is-active", locale === appState.locale);
      button.setAttribute("aria-pressed", locale === appState.locale ? "true" : "false");
    });
    document.documentElement.lang = appState.locale === "en" ? "en" : "ko";
  }

  function updateGlobalLowResourceButton() {
    const button = getElementById("low-resource-toggle");
    if (!button) {
      return;
    }

    const isActive = Boolean(appState.quickSettings.lowResourceMode);
    const labelKey = isActive ? "status.lowResourceOn" : "status.lowResourceOff";
    button.textContent = getString(labelKey);
    button.setAttribute("aria-label", getString("action.toggleLowResource"));
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  }

  function updateTopBar() {
    const mockData = getMockData();
    const routeDefinition = mockData.routes.find(function findRoute(routeItem) {
      return routeItem.path === appState.route;
    });
    const routeTitle = getElementById("route-title");
    const routeEyebrow = getElementById("route-eyebrow");
    if (routeTitle) {
      routeTitle.textContent = getString(routeDefinition ? routeDefinition.titleKey : "app.name");
    }
    if (routeEyebrow) {
      routeEyebrow.textContent = getString("app.staticOnly");
    }
  }

  function renderApp(options) {
    const appRoot = getElementById("app");
    const screenRoot = getElementById("screen-root");
    if (!appRoot || !screenRoot) {
      return;
    }

    appRoot.dataset.route = appState.route;
    appRoot.classList.toggle("low-resource-mode", Boolean(appState.quickSettings.lowResourceMode));
    updateStaticText();
    updateTopBar();
    updateRouteButtons();
    updateLanguageButtons();
    updateGlobalLowResourceButton();
    screenRoot.replaceChildren(renderScreenForRoute(appState.route));
    if (options && options.focusScreen) {
      try {
        screenRoot.focus({ preventScroll: true });
      } catch (error) {
        screenRoot.focus();
      }
    }
  }

  function navigateTo(route) {
    const nextRoute = normalizeRoute(route);
    appState.route = nextRoute;
    if (window.location.hash !== "#" + nextRoute) {
      window.location.hash = nextRoute;
    } else {
      renderApp({ focusScreen: true });
    }
  }

  function showToast(messageKey) {
    const toastRoot = getElementById("toast-root");
    if (!toastRoot) {
      return;
    }
    const toast = createElement("div", "toast", getString(messageKey));
    toast.setAttribute("role", "status");
    toastRoot.replaceChildren(toast);
    window.setTimeout(function removeToast() {
      if (toast.parentNode === toastRoot) {
        toastRoot.replaceChildren();
      }
    }, 2600);
  }

  function handleDocumentClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) {
      return;
    }

    const routeButton = target.closest("[data-route]");
    if (routeButton) {
      const route = routeButton.getAttribute("data-route");
      navigateTo(route);
      if (route === "/desktop" && appState.route === "/desktop") {
        showToast("toast.mockLogin");
      }
      return;
    }

    const localeButton = target.closest("[data-locale]");
    if (localeButton) {
      const nextLocale = localeButton.getAttribute("data-locale");
      appState.locale = nextLocale === "en" ? "en" : "ko";
      renderApp();
      return;
    }

    const actionButton = target.closest("[data-action]");
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute("data-action");
    if (action === "toggle-setting") {
      handleToggleSetting(actionButton);
    } else if (action === "dismiss-notification") {
      handleDismissNotification(actionButton);
    } else if (action === "dismiss-all-notifications") {
      handleDismissAllNotifications();
    } else if (action === "switch-workspace") {
      handleSwitchWorkspace(actionButton);
    }
  }

  function handleRouteListKeydown(event) {
    const key = event.key;
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(key)) {
      return;
    }

    const routeButtons = Array.from(document.querySelectorAll(".route-button"));
    if (routeButtons.length === 0) {
      return;
    }

    const activeIndex = routeButtons.indexOf(document.activeElement);
    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    let nextIndex = currentIndex;

    if (key === "ArrowDown" || key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % routeButtons.length;
    } else if (key === "ArrowUp" || key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + routeButtons.length) % routeButtons.length;
    } else if (key === "Home") {
      nextIndex = 0;
    } else if (key === "End") {
      nextIndex = routeButtons.length - 1;
    }

    event.preventDefault();
    routeButtons[nextIndex].focus();
  }

  function handleToggleSetting(actionButton) {
    const settingKey = actionButton.getAttribute("data-setting-key");
    if (!settingKey) {
      return;
    }

    let toastKey = "toast.mockToggle";
    if (settingKey === "performanceMode") {
      appState.quickSettings.performanceMode = "balancedPremium";
    } else {
      appState.quickSettings[settingKey] = !Boolean(appState.quickSettings[settingKey]);
      if (settingKey === "lowResourceMode") {
        toastKey = appState.quickSettings.lowResourceMode ? "toast.lowResourceOn" : "toast.lowResourceOff";
      }
    }
    renderApp();
    showToast(toastKey);
  }

  function handleDismissNotification(actionButton) {
    const notificationId = actionButton.getAttribute("data-notification-id");
    if (!notificationId) {
      return;
    }
    appState.dismissedNotificationIds.add(notificationId);
    renderApp();
    showToast("toast.mockDismiss");
  }

  function handleDismissAllNotifications() {
    const mockData = getMockData();
    mockData.notifications.forEach(function dismissNotification(notification) {
      appState.dismissedNotificationIds.add(notification.id);
    });
    renderApp();
    showToast("toast.mockDismissAll");
  }

  function handleSwitchWorkspace(actionButton) {
    const workspaceId = actionButton.getAttribute("data-workspace-id");
    if (!workspaceId) {
      return;
    }
    appState.activeWorkspaceId = workspaceId;
    renderApp();
    showToast("toast.mockWorkspace");
  }

  function initializeApp() {
    try {
      const mockData = getMockData();
      appState.route = getRouteFromHash();
      appState.quickSettings.focusMode = Boolean(mockData.quickSettings && mockData.quickSettings.focusMode);
      appState.quickSettings.lowResourceMode = Boolean(mockData.quickSettings && mockData.quickSettings.lowResourceMode);
      appState.quickSettings.performanceMode = "balancedPremium";

      document.addEventListener("click", handleDocumentClick);
      const routeList = getElementById("route-list");
      if (routeList) {
        routeList.addEventListener("keydown", handleRouteListKeydown);
      }
      window.addEventListener("hashchange", function handleHashChange() {
        appState.route = getRouteFromHash();
        renderApp({ focusScreen: true });
      });
      renderApp();
    } catch (error) {
      const screenRoot = getElementById("screen-root");
      if (screenRoot) {
        const message = error instanceof Error && error.message === "error.mockDataUnavailable"
          ? "Astra Shell mock data를 사용할 수 없습니다. / Astra Shell mock data is not available."
          : "정적 mock 초기화 오류가 발생했습니다. / Static mock initialization failed.";
        screenRoot.replaceChildren(createElement("div", "empty-state", message));
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }
})();
