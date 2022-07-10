const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  IOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
// console.log(isMobile);
// работаем со стрелочкой возле меню для тач-екранов
if (isMobile.any()) {
  document.body.classList.add("_touch");
  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    for (let i = 0; i < menuArrows.length; i++) {
      const menuArrow = menuArrows[i];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}

// Прокрутка при клике
// 1. Создаем массив элементов, для которых будем делать, а это
// элементы а у которых есть атрибут [data-goto]
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
// 2. Если массив не пустой то в цикле forEach подвязіваем к клику
// такую функцию onMenuLinkClick
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  // описываем функцию onMenuLinkClick:
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    // проверяем, заполнен ли этот дата атрибут И существует
    // ли объект, на который ссылается данный дата атрибут
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      // получаем в константу сам этот объект
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      // высчитываем положение объекта с учетом высоты шапки
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector("header").offsetHeight;
      // это функция скролла
				window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      // выключает работу ссылкиб ведь надо, чтобы работала прокрутка
      e.preventDefault();
    }
  }
}
