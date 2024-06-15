#!/bin/bash

# Mensaje de inicio
echo "Iniciando configuración de la aplicación..."

# Configuración del backend
echo "Configurando el backend..."
cd backend
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Inicio del backend
echo "Iniciando el backend..."
npm start &

# Volver a la raíz del proyecto
cd ..

# Configuración del frontend
echo "Configurando el frontend..."
cd frontend
npm install

# Crear el build del frontend (opcional, principalmente para producción)
echo "Creando el build del frontend..."
npm run build

# Inicio del frontend
echo "Iniciando el frontend..."
npm start &

# Mensaje de finalización
echo "La aplicación está configurada y en ejecución."
