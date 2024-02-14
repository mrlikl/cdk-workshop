# Use an existing Python image as the base image
FROM matthewfeickert/docker-python3-ubuntu

# Set the working directory inside the container
WORKDIR /

# Copy the requirements.txt file to the container
COPY requirements.txt .

COPY ./run.sh /tmp
RUN sudo chmod +x /tmp/run.sh


# Install the required packages
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Specify the command to run when the container is started
CMD ["./tmp/run.sh"]

EXPOSE 80
EXPOSE 3330