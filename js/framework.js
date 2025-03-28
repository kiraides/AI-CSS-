/**
 * CSS Framework JavaScript機能
 * モーダル、ドロワー、タブUIの動作を提供します
 */

(function () {
  'use strict';

  // DOM読み込み完了時に実行
  document.addEventListener('DOMContentLoaded', function () {
    // モーダル機能
    setupModals();

    // ドロワーメニュー機能
    setupDrawers();

    // タブUI機能
    setupTabs();

    // ドロップダウン機能（ドロワー内）
    setupDropdowns();
  });

  /**
   * モーダル機能のセットアップ
   */
  function setupModals() {
    // モーダルを開くボタン
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');

    // 各トリガーにクリックイベントを追加
    modalTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();

        // ターゲットのモーダルを取得
        const targetId = this.getAttribute('data-target');
        const targetModal = document.querySelector(targetId);

        if (targetModal) {
          openModal(targetModal);
        }
      });
    });

    // 閉じるボタン
    const closeBtns = document.querySelectorAll('[data-dismiss="modal"]');
    closeBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();

        // 親のモーダルを探して閉じる
        const modal = this.closest('.modal');
        if (modal) {
          closeModal(modal);
        }
      });
    });

    // モーダル背景クリックで閉じる
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('modal')) {
        closeModal(e.target);
      }
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        if (openModals.length > 0) {
          closeModal(openModals[openModals.length - 1]);
        }
      }
    });

    // モーダルを開く関数
    function openModal(modal) {
      // 背景を作成
      let backdrop = document.querySelector('.modal-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        document.body.appendChild(backdrop);
      }

      // 本体を表示
      document.body.classList.add('modal-open');
      modal.classList.add('show');
      backdrop.classList.add('show');

      // アクセシビリティ
      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');

      // フォーカスをモーダル内の最初のフォーカス可能な要素に移動
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    // モーダルを閉じる関数
    function closeModal(modal) {
      const backdrop = document.querySelector('.modal-backdrop');

      modal.classList.remove('show');
      if (backdrop) {
        backdrop.classList.remove('show');

        // アニメーション終了後に背景を削除
        setTimeout(function () {
          if (!document.querySelector('.modal.show')) {
            document.body.classList.remove('modal-open');
            backdrop.remove();
          }
        }, 300);
      }

      // アクセシビリティ
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * ドロワーメニュー機能のセットアップ
   */
  function setupDrawers() {
    // ドロワー開くボタン
    const drawerTriggers = document.querySelectorAll('[data-toggle="drawer"]');

    // 各トリガーにクリックイベントを追加
    drawerTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();

        // ターゲットのドロワーを取得
        const targetId = this.getAttribute('data-target');
        const targetDrawer = document.querySelector(targetId);

        if (targetDrawer) {
          // 開閉状態を切り替え
          if (targetDrawer.classList.contains('show')) {
            closeDrawer(targetDrawer);
          } else {
            openDrawer(targetDrawer);
          }
        }
      });
    });

    // 閉じるボタン
    const closeBtns = document.querySelectorAll('[data-dismiss="drawer"]');
    closeBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();

        // 親のドロワーを探して閉じる
        const drawer = this.closest('.drawer');
        if (drawer) {
          closeDrawer(drawer);
        }
      });
    });

    // ドロワー背景クリックで閉じる
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('drawer-backdrop')) {
        const openDrawers = document.querySelectorAll('.drawer.show');
        if (openDrawers.length > 0) {
          closeDrawer(openDrawers[0]);
        }
      }
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const openDrawers = document.querySelectorAll('.drawer.show');
        if (openDrawers.length > 0) {
          closeDrawer(openDrawers[0]);
        }
      }
    });

    // ドロワーを開く関数
    function openDrawer(drawer) {
      // 背景を作成
      let backdrop = document.querySelector('.drawer-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'drawer-backdrop';
        document.body.appendChild(backdrop);
      }

      // 本体を表示
      document.body.classList.add('drawer-open');
      drawer.classList.add('show');

      // アニメーションを考慮して少し遅らせて背景表示
      setTimeout(function () {
        backdrop.classList.add('show');
      }, 10);

      // アクセシビリティ
      drawer.setAttribute('aria-hidden', 'false');
      drawer.setAttribute('aria-expanded', 'true');

      // フォーカスをドロワー内の最初のフォーカス可能な要素に移動
      const focusable = drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    // ドロワーを閉じる関数
    function closeDrawer(drawer) {
      const backdrop = document.querySelector('.drawer-backdrop');

      drawer.classList.remove('show');
      if (backdrop) {
        backdrop.classList.remove('show');

        // アニメーション終了後に背景を削除
        setTimeout(function () {
          if (!document.querySelector('.drawer.show')) {
            document.body.classList.remove('drawer-open');
            backdrop.remove();
          }
        }, 300);
      }

      // アクセシビリティ
      drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * タブUI機能のセットアップ
   */
  function setupTabs() {
    // タブトリガー
    const tabTriggers = document.querySelectorAll('[data-toggle="tab"]');

    // 各トリガーにクリックイベントを追加
    tabTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();

        // 他のタブのアクティブ状態を解除
        const tabContainer = this.closest('.tabs');
        if (tabContainer) {
          const activeTabs = tabContainer.querySelectorAll('.tab-nav-link.active');
          activeTabs.forEach(function (tab) {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
          });

          // クリックされたタブをアクティブに
          this.classList.add('active');
          this.setAttribute('aria-selected', 'true');

          // ターゲットのタブペインをアクティブに
          const targetId = this.getAttribute('data-target') || this.getAttribute('href');
          if (targetId) {
            const targetPane = document.querySelector(targetId);
            const tabContent = tabContainer.querySelector('.tab-content');

            if (targetPane && tabContent) {
              // 全てのタブペインを非表示に
              const tabPanes = tabContent.querySelectorAll('.tab-pane');
              tabPanes.forEach(function (pane) {
                pane.classList.remove('active');
              });

              // ターゲットのペインを表示
              targetPane.classList.add('active');
            }
          }
        }
      });
    });

    // 初期状態でアクティブなタブがなければ、最初のタブをアクティブに
    const tabContainers = document.querySelectorAll('.tabs');
    tabContainers.forEach(function (container) {
      const tabs = container.querySelectorAll('.tab-nav-link');
      const activeTab = container.querySelector('.tab-nav-link.active');

      if (tabs.length > 0 && !activeTab) {
        // 最初のタブをクリックしたことにする
        tabs[0].click();
      }
    });
  }

  /**
   * ドロップダウン機能のセットアップ（ドロワー内など）
   */
  function setupDropdowns() {
    // ドロップダウントリガー
    const dropdownTriggers = document.querySelectorAll('.dropdown-toggle');

    // 各トリガーにクリックイベントを追加
    dropdownTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();

        // 開閉状態を切り替え
        this.classList.toggle('show');

        // サブメニューの取得と表示切替
        const parent = this.closest('.nav-item');
        if (parent) {
          const submenu = parent.querySelector('.nav-submenu');
          if (submenu) {
            submenu.classList.toggle('show');

            // アクセシビリティ
            const expanded = submenu.classList.contains('show');
            this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
          }
        }
      });
    });
  }
})(); 