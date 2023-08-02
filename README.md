# CS 453 Project 2 - Ben Morgan


## Running
This project builds off project 1. There is now a SOAP/WSDL server that makes a call with a part number, and returns the price and delivery date.


To run, type the following command into the terminal where the files are located.
```shell
./start.sh
```

To make sure it is running, go to [http://localhost:3000/cars](http://localhost:3000/cars).

Once it is running to test the SOAP functionality you can run the `partGetInfo.sh` script from the tests folder or type the following into the terminal.
```shell
curl -X GET http://localhost:3000/parts/1234
```
This will return the price & delivery date for part 1234.

When using postman, this is what the results will look like.
![image](https://github.com/thebamorgan/cs453proj2/assets/77521759/a1d4f378-82e8-4278-a8e7-95fdd49035d8)

To close the containers, you can hit ctrl^c in the terminal you started it in or type
```shell
docker-compose down -v 
```
