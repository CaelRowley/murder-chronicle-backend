package main

import (
	"fmt"

	"rsc.io/quote"
)

type Greeting func(name string) string

func (g Greeting) exclamation(name string) string {
	return g(name) + "!"
}

var hello = Greeting(func(name string) string {
	return "Hello, " + name
})

func main() {
	fmt.Println(quote.Go())
	fmt.Println(hello.exclamation("world"))
}
