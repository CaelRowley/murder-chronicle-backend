package main

import (
	"fmt"

	"rsc.io/quote"
)

type Greeting func(name string) string

func say(g Greeting, n string) { fmt.Println(g(n)) }

func french(name string) string { return "Bonjour, " + name }

func (g Greeting) exclamation(name string) string {
	return g(name) + "!"
}

var hello = Greeting(func(name string) string {
	return "Hello, " + name
})

func main() {
	fmt.Println(quote.Go())
	fmt.Println(hello.exclamation("world"))

	english := func(name string) string { return "Hello, " + name }

	say(english, "world!")
	say(french, "world!")
}
