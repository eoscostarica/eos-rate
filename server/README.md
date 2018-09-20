```
npm start

# go to
http://localhost:3001/graphql
```

Add support to custom graph type and mongoose types

```
query ratings {
  ratings {
    id
  }

}

query blockProducers {
  blockProducers {
    id
  }

}

mutation create ($record: CreateOneRateInput!){
  rateCreateOne(record: $record) {
    recordId,
    record {
      rate
    }
  }

}

query rateOne {
  rateOne {
    rate
  }
}
```
