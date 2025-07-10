# Gunakan image Node.js resmi
FROM node:18-alpine

# Set direktori kerja
WORKDIR /app

# Salin file package.json dan install dependensi
COPY package*.json ./
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Build Next.js
RUN npm run build

# Ekspos port 3000
EXPOSE 3000

# Jalankan Next.js app (gunakan mode production)
CMD ["npm", "run", "start"]
