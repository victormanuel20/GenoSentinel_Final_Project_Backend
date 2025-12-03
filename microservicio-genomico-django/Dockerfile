# Imagen oficial de Python
FROM python:3.11-slim

# Crear directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema para MySQL
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    default-mysql-client \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copiar dependencias primero (mejora cache)
COPY requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el proyecto completo al contenedor
COPY . .

# Exponer el puerto del servidor Django
EXPOSE 8000

# Comando para ejecutar el servidor (modo desarrollo)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]