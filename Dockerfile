# Usa una imagen ligera de Node
FROM node:18-alpine

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto
COPY . .

# Instala las dependencias
RUN npm install

# Compila el proyecto Next.js
RUN npm run build

# Expone el puerto donde Next.js corre por defecto
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["npm", "start"]
