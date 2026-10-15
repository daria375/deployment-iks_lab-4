# Базовий образ з Node.js
FROM node:18

# Додаємо змінні середовища за завданням
ENV PORT=4000
ENV APP_ENV=production

# Робоча директорія у контейнері
WORKDIR /app

# Копіюємо package.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів проєкту
COPY . .

# Відкриваємо новий порт (4000)
EXPOSE 4000

# Команда запуску
CMD ["npm", "start"]
