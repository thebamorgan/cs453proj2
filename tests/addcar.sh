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
