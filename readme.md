# My Notes Application

## Descripción

Esta es una aplicación web que permite a los usuarios crear, editar y eliminar notas. Además, los usuarios pueden agregar categorías a las notas y filtrar las notas por categoría. La aplicación está dividida en un frontend desarrollado con React y un backend desarrollado con Node.js, Express y Sequelize para la interacción con la base de datos MySQL.

## Requisitos

- Node.js (v18.17 o superior)
- npm (v6.14 o superior)
- MySQL (u otra base de datos relacional compatible con Sequelize) instalado y en ejecución
- Bash/Zsh (para ejecutar el script de inicio)

## Configuración del Proyecto

1. Clona el repositorio desde GitHub:

    ```bash
    git clone <URL_DEL_REPOSITORIO_PRIVADO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

    ```env
    # MySQL configuration
    DB_USERNAME=my_user
    DB_PASSWORD=My_Str0ng_P@ssw0rd!
    DB_NAME=my_database
    DB_NAME_TEST=my_database_test
    DB_NAME_PROD=my_database_prod
    DB_HOST=127.0.0.1
    ```

3. Asegúrate de que el script de inicio sea ejecutable:

    ```bash
    chmod +x start.sh
    ```

4. Configura MySQL creando una base de datos y un usuario. Conéctate a MySQL como root y ejecuta los siguientes comandos:

    ```bash
    sudo mysql -u root -p
    ```

    ```sql
    CREATE DATABASE my_database;
    CREATE USER 'my_user'@'localhost' IDENTIFIED BY 'My_Str0ng_P@ssw0rd!';
    GRANT ALL PRIVILEGES ON my_database.* TO 'my_user'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;
    ```

## Ejecución del Proyecto

Para configurar y ejecutar la aplicación, usa el siguiente comando en tu terminal:

```bash
./start.sh
