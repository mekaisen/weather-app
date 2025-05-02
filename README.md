# Weather App

Современное веб-приложение для просмотра прогноза погоды, созданное с использованием React, TypeScript и Vite.

## Технологии

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)

## Структура проекта

```
src/
  ├── components/     # UI компоненты
  ├── lib/            # Вспомогательные функции и утилиты
  ├── shared/         # Общие ресурсы (типы, константы)
  └── utils/          # Утилиты
```

## Команды

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Проверка кода линтером
npm run lint

# Предпросмотр собранного приложения
npm run preview
```

## Настройка

Проект использует alias `@` для импорта из корневой директории `src`:

```typescript
// Пример импорта
import { Button } from '@/components/ui/button';
```

## Развертывание

Для сборки проекта выполните:

```bash
npm run build
```

Собранные файлы будут доступны в директории `dist/`, которые можно разместить на любом веб-сервере.
