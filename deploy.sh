set -e

APP_NAME=egplandingpage
IMAGE_NAME=$APP_NAME:latest
CONTAINER_NAME=$APP_NAME-container

echo "🚀 Deploying $APP_NAME ..."


cd /home/ubuntu/$APP_NAME


git pull origin main


docker build -t $IMAGE_NAME .


if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "🛑 Stopping old container..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi


echo "▶️ Starting new container..."
docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME

echo "✅ Deploy finished!"
