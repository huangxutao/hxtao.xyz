;(function() {
  if (!('serviceWorker' in window.navigator)) return;

  window.navigator.serviceWorker.register('/sw.js', { scope: '/' }).then((state) => {
    console.log('🔧 sw registered!');
  }).catch(err => {
    console.error(err);
  });

  // 保证一致性 如果在 install 后直接 skipWaiting
  // window.navigator.serviceWorker.addEventListener('controllerchange', () => {
  //   // 建议将控制权留给用户自己
  //   window.location.reload();
  // });

  /**
   * 自定义添加到主屏
   */
  // window.addEventListener('beforeinstallprompt', (e) => {
  //   e.preventDefault();

  //   const isDismissed = !!localStorage.getItem('isDismissed');

  //   if (isDismissed) return;

  //   const installBtn = document.createElement('button');

  //   installBtn.className = 'install-btn';

  //   installBtn.innerText = 'Add to Home screen';

  //   document.body.appendChild(installBtn);

  //   installBtn.addEventListener('click', () => {
  //     e.prompt();
  //   });

  //   e.userChoice.then((result) => {
  //     if (result.outcome === 'dismissed') {
  //       console.log('阿欧，拒绝添加到主屏幕。' );
  //       installBtn.className += ' hidden';
  //       localStorage.setItem('isDismissed', true);
  //       setTimeout(() => {
  //         document.body.removeChild(installBtn);
  //       }, 1000);
  //     } else {
  //       installBtn.innerText = 'installing...';
  //     }
  //   });
  // });

  // window.addEventListener('appinstalled', () => {
  //   const installBtn = document.querySelector('.install-btn');

  //   console.log('🎉🎉🎉 添加到主屏拉！');

  //   if (installBtn) {
  //     installBtn.className += ' hidden';
  //   }
  // });
})();
