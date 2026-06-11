import { Container, Graphics } from 'pixi.js';

class PixiSlider extends Container {
    constructor(width = 300, min = 0, max = 100) {
        super();
        this.sliderWidth = width;
        this.min = min;
        this.max = max;
        
        // Начальное значение по умолчанию (середина диапазона)
        this.value = (min + max) / 2; 

        // Пустой коллбек по умолчанию, который пользователь может переопределить снаружи
        this.onValueChange = null;

        // 1. Задний фон трека (серый/неактивный)
        this.trackBg = new Graphics();
        this.trackBg.rect(0, -2, this.sliderWidth, 4);
        this.trackBg.fill({ color: 0x4a4a4a }); 
        this.addChild(this.trackBg);

        // 2. Активная (заполненная) часть трека. Изначально ширина 0.
        this.trackFill = new Graphics();
        this.trackFill.rect(0, -2, 1, 4); // Базовый прямоугольник шириной 1px для масштабирования
        this.trackFill.fill({ color: 0x000000 }); // Белый или розовый в стиле DDLC
        this.addChild(this.trackFill);

        // 3. Бегунок (ручка)
        this.handle = new Graphics();
        this.handle.rect(-8, -8, 16, 16); 
        this.handle.fill({ color: 0xffffff });
        this.handle.stroke({ width: 2, color: 0x4a4a4a });

        this.handle.eventMode = 'static';
        this.handle.cursor = 'pointer';
        this.addChild(this.handle);

        // Регистрация событий
        this.handle.on('pointerdown', this.onDragStart, this);
        
        this.pointerId = null;

        // Первичная синхронизация графики под дефолтное значение
        this.updateVisuals();
    }

    onDragStart(event) {
        this.pointerId = event.pointerId;
        window.addEventListener('pointermove', this.onWindowMove);
        window.addEventListener('pointerup', this.onWindowEnd);
    }

    onWindowMove = (event) => {
        if (this.pointerId === null) return;

        const localPos = this.toLocal({ x: event.clientX, y: event.clientY });
        let newX = localPos.x;

        // Ограничиваем рамками трека
        if (newX < 0) newX = 0;
        if (newX > this.sliderWidth) newX = this.sliderWidth;

        // Считаем прогресс (0.0 - 1.0)
        const percentage = newX / this.sliderWidth;

        // Переводим прогресс в реальное значение между min и max
        this.value = this.min + percentage * (this.max - this.min);

        // Обновляем позиции графики
        this.updateVisuals();

        // Вызываем кастомный коллбек, если пользователь его задал
        if (typeof this.onValueChange === 'function') {
            this.onValueChange(this.value);
        }
    }

    onWindowEnd = () => {
        this.pointerId = null;
        window.removeEventListener('pointermove', this.onWindowMove);
        window.removeEventListener('pointerup', this.onWindowEnd);
    }

    // Публичный метод для ручной установки значения извне
    setValue(newValue) {
        this.value = Math.max(this.min, Math.min(this.max, newValue));
        this.updateVisuals();
        
        // Опционально: триггерим коллбек при программной установке, если нужно
        if (typeof this.onValueChange === 'function') {
            this.onValueChange(this.value);
        }
    }

    // Метод, который одновременно двигает бегунок и растягивает трек
    updateVisuals() {
        const range = this.max - this.min;
        const percentage = range === 0 ? 0 : (this.value - this.min) / range;

        // Рассчитываем текущую ширину заполнения в пикселях
        const currentFillWidth = percentage * this.sliderWidth;

        // Двигаем бегунок
        this.handle.x = currentFillWidth;

        // Изменяем ширину заполненной полосы трека
        this.trackFill.width = currentFillWidth;
    }
    
    destroy(options) {
        window.removeEventListener('pointermove', this.onWindowMove);
        window.removeEventListener('pointerup', this.onWindowEnd);
        super.destroy(options);
    }
}

export default PixiSlider;
