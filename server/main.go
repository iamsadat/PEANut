package main

import (
	"fmt"
	"io"
	"net/http"
	"strings"
)

func main() {

	url := "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*"

	payload := strings.NewReader("{\r\n  \"source_code\": \"#include <stdio.h>\\n\\nint main(void) {\\n  char name[10];\\n  scanf(\\\"%s\\\", name);\\n  printf(\\\"hello, %s\\n\\\", name);\\n  return 0;\\n}\",\r\n  \"language_id\": 50,\r\n  \"stdin\": \"Judge0\",\r\n  \"expected_output\": \"hello, Judge0\"\r\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("content-type", "application/json")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("X-RapidAPI-Key", "05791900d0msh10597bb4c661f8cp16290ejsnb48d26443a54")
	req.Header.Add("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
