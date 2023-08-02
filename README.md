# Example Node/Express RESTFul Server

## Running
This server consists of a simple node.js server with a set of routes for cars


You can see how its structure in the cars.yaml openapi 3.0 spec. 

To run, 
```shell
./start.sh
```

To make sure its working go to [http://localhost:3000/cars](http://localhost:3000/cars)

You can creat a new vehicle with curl 
```shell
curl -X POST --location "http://localhost:3000/cars" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d "{
          \"VIN\": \"N3WC4R\",
          \"Make\": \"Tesla\",
          \"Model\": \"Model 3\",
          \"Year\": 2021,
          \"Plate\": \"L3G0\",
          \"State\": \"New York\",
          \"Owner\": \"Bob Morgan\",
          \"License\": \"78910DEF\",
          \"Address\": \"301 Sparkman Drive, Hsv, AL\",
          \"Problem\": \"Won't run after filling up with gas\",
          \"Shop\": \"Space & Rocket Center\",
          \"Worker\": \"Buzz Aldrin\",
          \"Date\": \"July 5th, 2023\"
        }"

```

And to fetch customers
```shell
curl -X GET --location "http://localhost:3000/cars"
```

To close the containers, you can hit ctrl^c in the terminal you started it in or 
```shell
docker-compose down -v 
```

There are also shell scripts within the tests folder that you can modify and run.
