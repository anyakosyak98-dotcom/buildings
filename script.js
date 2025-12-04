document.addEventListener('DOMContentLoaded', () => {
    // 1. Получение элементов
    const portfolioSlider = document.querySelector('.portfolio_slider');
    const cards = document.querySelectorAll('.card');
    const arrowLeft = document.querySelector('.arrow_left_slider');
    const arrowRight = document.querySelector('.arrow_right_slider');
    const progressBarText = document.querySelector('.progress_text');
    const progressCurrentTotal = progressBarText.querySelector('.progress_current');
    const progressLineActive = document.querySelector('.progress_line_aktive');

    // 2. Определение параметров
    const CARDS_PER_PAGE = 3;
    const TOTAL_CARDS = cards.length; // 6 карточек
    const TOTAL_PAGES = Math.ceil(TOTAL_CARDS / CARDS_PER_PAGE); // 6 / 3 = 2 страницы
    let currentPage = 1;

    // Инициализация общего количества страниц в прогресс-баре
    progressCurrentTotal.textContent = TOTAL_PAGES < 10 ? '0' + TOTAL_PAGES : TOTAL_PAGES;

    // 3. Функции для обновления состояния
    
    /** Обновляет отображаемые карточки */
    function updateSlider() {
        // Рассчитываем смещение для текущей страницы
        const offset = (currentPage - 1) * CARDS_PER_PAGE;
        
        // Скрываем все карточки
        cards.forEach((card, index) => {
            if (index >= offset && index < offset + CARDS_PER_PAGE) {
                // Добавляем класс, чтобы показать/сместить карточки текущей страницы
                card.style.display = 'flex'; 
                // Сдвигаем карточки на нужное количество позиций (для симуляции сдвига, если бы это был карусель)
                // Но для вашего текущего flex-wrap и 6 карточек, проще показывать/скрывать:
                // Однако, если вы хотите использовать transform для плавности, нужно изменить CSS.
                // В данном примере, я буду использовать простую логику отображения/скрытия
            } else {
                 card.style.display = 'none';
            }
        });

        // ВАЖНО: Для вашего текущего HTML/CSS, где все 6 карточек находятся в одном
        // flex-контейнере с `flex-wrap: wrap`, для реализации постраничного
        // переключения, мы просто показываем 3 карточки и скрываем остальные.
        // Более правильный подход для слайдера - использовать `transform: translateX()`, 
        // но это требует других CSS-стилей. Давайте адаптируем под текущий макет.
        
        // 4. Обновление прогресс-бара и кнопок
        updateProgressBar();
    }
    
    /** Обновляет индикатор прогресса и состояние стрелок */
    function updateProgressBar() {
        // Обновляем текст: "0X/0Y"
        const currentText = currentPage < 10 ? '0' + currentPage : currentPage;
        progressBarText.firstChild.textContent = currentText + '/'; // Обновляем "01/" или "02/"
        
        // Обновляем полосу прогресса
        const progressPercentage = (currentPage / TOTAL_PAGES) * 100;
        progressLineActive.style.width = `${progressPercentage}%`;
        
        // Обновление состояния стрелок (disabled)
        if (currentPage === 1) {
            arrowLeft.classList.add('disabled');
        } else {
            arrowLeft.classList.remove('disabled');
        }

        if (currentPage === TOTAL_PAGES) {
            arrowRight.classList.add('disabled');
        } else {
            arrowRight.classList.remove('disabled');
        }
    }

    // 5. Обработчики событий
    
    // Клик по правой стрелке (Вперед)
    arrowRight.addEventListener('click', () => {
        if (currentPage < TOTAL_PAGES) {
            currentPage++;
            updateSlider();
        }
    });

    // Клик по левой стрелке (Назад)
    arrowLeft.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateSlider();
        }
    });

    // 6. Инициализация при загрузке
    // Скрываем все, кроме первых трех, и устанавливаем начальное состояние прогресс-бара
    updateSlider(); 
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Получаем все элементы аккордеона
    const faqItems = document.querySelectorAll('.faq_item');

    // Функция для закрытия всех открытых элементов
    const closeAllFaqItems = () => {
        faqItems.forEach(item => {
            // Удаляем класс, который открывает блок
            item.classList.remove('faq_item_open');
            
            // Находим и скрываем текст ответа, добавляя класс faq_answer_text_none
            const answer = item.querySelector('.faq_answer');
            if (answer) {
                 // Убедимся, что убираем 'faq_answer_text', если он используется для отображения
                answer.classList.remove('faq_answer_text');
                answer.classList.add('faq_answer_text_none');
            }
            
            // Находим элементы заголовка, чтобы поменять класс, если он есть
            const headerOpen = item.querySelector('.faq_open');
            const headerClose = item.querySelector('.faq_close');

            if (headerOpen && !headerClose) {
                // Если есть только .faq_open, заменяем его на .faq_close
                headerOpen.classList.remove('faq_open');
                headerOpen.classList.add('faq_close');
            } else if (headerOpen && headerClose) {
                // Если оба есть (как в вашей разметке), просто работаем с родительским элементом
                // Хотя в вашей структуре это будет немного сложно,
                // лучше будет использовать один элемент заголовка и менять его класс или работать через структуру DOM.
            }
        });
    };

    // 2. Проходим по каждому элементу и добавляем слушатель
    faqItems.forEach(item => {
        // Мы ищем элемент, по которому нужно кликнуть. 
        // В вашей разметке это либо .faq_close, либо .faq_open. 
        // Мы будем искать оба и добавлять слушатель.
        const headerElements = item.querySelectorAll('.faq_close, .faq_open');
        
        headerElements.forEach(header => {
            header.addEventListener('click', () => {
                // 3. Проверяем, открыт ли текущий элемент
                const isCurrentlyOpen = item.classList.contains('faq_item_open');

                // 4. Закрываем все открытые элементы
                closeAllFaqItems();
                
                const answer = item.querySelector('.faq_answer');

                // Если элемент был закрыт (isCurrentlyOpen == false), открываем его
                if (!isCurrentlyOpen) {
                    item.classList.add('faq_item_open');
                    
                    // Показываем текст ответа
                    if (answer) {
                        answer.classList.remove('faq_answer_text_none');
                        answer.classList.add('faq_answer_text'); // Добавляем класс со стилями для открытого состояния
                    }

                    // Обновляем класс заголовка, чтобы применить стили открытого состояния (если нужно)
                    // Ваша CSS-логика основана на классе родителя .faq_item_open, 
                    // но для корректной работы с двумя классами заголовка в HTML:
                    const faqClose = item.querySelector('.faq_close');
                    const faqOpen = item.querySelector('.faq_open');
                    
                    if (faqClose) {
                        // Меняем класс заголовка с 'faq_close' на 'faq_open' для применения стилей (если они в нем)
                        faqClose.classList.remove('faq_close');
                        faqClose.classList.add('faq_open');
                    } else if (!faqOpen) {
                        // Это сложный случай, если в HTML изначально был только faq_close
                        // и мы его переименовали в faq_open.
                    }

                } else {
                    // Если элемент был открыт, closeAllFaqItems() его уже закрыл. 
                    // Мы также должны убедиться, что класс заголовка вернется к faq_close
                    const faqOpen = item.querySelector('.faq_open');
                    if (faqOpen) {
                        faqOpen.classList.remove('faq_open');
                        faqOpen.classList.add('faq_close');
                    }
                }
            });
        });

        // Также добавляем слушатель на сам `h4`, так как вы хотите клик по стрелке/тексту
        const titleElement = item.querySelector('h4.subtitle_black');
        if (titleElement) {
             // Чтобы избежать двойного срабатывания, если уже добавили слушатель на родителя, 
             // мы можем просто убедиться, что клик на h4 всплывает до родительского header.
             // В вашем случае лучше всего вешать слушатель на внешний div, содержащий h4 и стрелку.
             // Мы уже это сделали, используя `.faq_close, .faq_open`.
        }
    });
    
    // Инициализация: исправляем начальное состояние, если оно открыто через HTML (например, второй элемент)
    // Убедимся, что при загрузке страницы правильно применены классы для единственного открытого элемента (если он есть).
    const initiallyOpenItem = document.querySelector('.faq_item_open');
    if (initiallyOpenItem) {
        // Гарантируем, что у открытого элемента правильные классы для ответа
        const answer = initiallyOpenItem.querySelector('.faq_answer');
        if (answer) {
            answer.classList.remove('faq_answer_text_none');
            answer.classList.add('faq_answer_text');
        }
    } else {
        // Если изначально все закрыто, убедимся, что у всех ответов стоит display: none.
        faqItems.forEach(item => {
            const answer = item.querySelector('.faq_answer');
            if (answer) {
                answer.classList.add('faq_answer_text_none');
                answer.classList.remove('faq_answer_text');
            }
        });
    }
});