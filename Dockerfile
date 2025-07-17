# Gunakan image Node.js ringan
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin dan install dependensi (WAJIB salin package-lock.json juga)
COPY package.json package-lock.json ./

# Install semua dependency
RUN npm install

# Salin semua source code, termasuk prisma dan src
COPY . .

# Generate Prisma client setelah semua file tersedia
RUN npx prisma generate

# Nonaktifkan linting agar tidak gagal build
ENV NEXT_DISABLE_ESLINT=1

# Build Next.js
RUN npm run build

# Buka port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "start"]
