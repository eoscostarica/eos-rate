const logGreeting = (_: any, payload: any) => {
  console.info("Greet invoked ===> Payload:\n", payload)
}

const effects = [
  {
    actionType: "eosrate::rate",
    effect: logGreeting
  }
]

export { effects }
