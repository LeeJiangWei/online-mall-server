## Description
+ Nothing to say now.

## Predefined values
### User state
|Values|Description|
|---|---|
|0|Frozen user|
|1|Normal user|
|5|Super user|

### Goods state
|Values|Description|
|---|---|
|0|Frozen good|
|1|On sale|
|2|Sold out|

### Order state
|Values|Description|
|---|---|
|0|Frozen|
|1|Ongoing|
|2|Finished|
|3|Aborted|

## API (/api)
### Abstract
+ Get all.
+ Get selected one.
+ Add one.
+ Update one.

### /user
```
GET:/ {
    response {
        message:string,
        users:array
    }
}

GET:/:userId {
    response {
        message:string,
        user:object,
        goods:array,
        orders:array
    }
}

POST:/:userId {
    parameters {
        userId:integer
        userName:string,
        password:string,
        address:string,
        phoneNumber:string,
        userState?:string,
    },
    response {
        message:string
    }
}

POST:/register {
    parameters {
        userName:string,
        password:string,
        address?:string,
        phoneNumber?:string
    },
    response {
        message:string
    }
}

POST:/login {
    parameters {
        userName:string,
        password:string
    },
    response {
        message:string,
        userState:number
    }
}

GET:/logout {
    response {
        message:string
    }
}

Get:/status {
    response {
        user:obj
    }
}
```

### /goods
```
GET:/ {
    response {
        message:string,
        goods:array
    }
}

GET:/:goodsId {
    response {
        message:string,
        goods:object,
    }
}

POST:/:goodsId {
    parameters {
        goodsName:string,
        price:number,
        picture:string,
        category:string,
        description:string,
        goodsState:number,
        userId:integer
    },
    response {
        message:string
    }
}

POST:/add {
    parameters {
        goodsName:text,
        price:number,
        picture:text,
        category:text,
        description:text
    },
    response {
        message:string
    }
}
```

### /order
```
GET:/ {
    response {
        message:string,
        orders:array
    }
}

GET:/:orderId {
    response {
        message:string,
        order:object,
    }
}

POST:/:orderId {
    parameters {
        orderState:number
    },
    response {
        message:string
    }
}

POST:/add {
    parameters {
        goodsId:number,
    },
    response {
        message:string
    }
}
```
