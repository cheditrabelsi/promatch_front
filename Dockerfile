FROM node:18.18.0

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies first to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Bring in application source
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
