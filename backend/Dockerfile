# Use an official Python runtime as a parent image
FROM python:3.9-slim
# Install required system packages
RUN apt-get update && apt-get install -y \
    gcc \
    make \
    libffi-dev \
    libssl-dev \
    libdbus-1-dev \
    libdbus-glib-1-dev \
    portaudio19-dev \
    libcups2-dev \
    libkrb5-dev \
    && apt-get clean
# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5000 to allow external access to the Flask app
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]
