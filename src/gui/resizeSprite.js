import { app } from "../main";

export const resizeSprite = (sprite) => {
    const screenW = app.screen.width;
    const screenH = app.screen.height;

    // Получаем исходные размеры текстуры
    const textureW = sprite.texture.width;
    const textureH = sprite.texture.height;

    // Считаем коэффициенты масштабирования для обеих осей
    const scaleX = screenW / textureW;
    const scaleY = screenH / textureH;

    // Выбираем МАКСИМАЛЬНЫЙ масштаб (для contain нужен был бы минимальный)
    const maxScale = Math.max(scaleX, scaleY);

    // Применяем одинаковый масштаб к обеим осям для сохранения пропорций
    sprite.scale.set(maxScale);

    // Центрируем спрайт по экрану
    sprite.position.set(screenW / 2, screenH / 2);
}