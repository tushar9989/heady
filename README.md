# Usage

## Category

### Save
Request
```
curl -X POST \
  http://localhost:3000/categories \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "Xiaomi",
	"parent": "Mobiles"
}'
```

Response
```
{
    "n": 1,
    "nModified": 0,
    "upserted": [
        {
            "index": 0,
            "_id": "Xiaomi"
        }
    ],
    "ok": 1
}
```

### Get
Request
```
curl -X GET \
  http://localhost:3000/categories
```

Response
```
[
    {
        "name": "a",
        "children": [
            "b"
        ]
    },
    {
        "name": "b"
    },
    {
        "name": "c"
    },
    {
        "name": "Electronics",
        "children": [
            "Mobiles"
        ]
    },
    {
        "name": "Mobiles",
        "children": [
            "Xiaomi",
            "Samsung",
            "One Plus"
        ]
    },
    {
        "name": "One Plus"
    },
    {
        "name": "Samsung"
    },
    {
        "name": "Xiaomi"
    }
]
```

## Product

### Create
Request
```
curl -X POST \
  http://localhost:3000/products \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "Galaxy Note 9",
	"price": 63000,
	"description": "mobile phone",
	"categories": [
		"Samsung",
		"Mobiles"
	]
}'
```

Response
```
{
    "n": 1,
    "nModified": 0,
    "upserted": [
        {
            "index": 0,
            "_id": "ca4f26a2-cdd9-472e-9fbd-414636d0c54a"
        }
    ],
    "ok": 1
}
```

### Update
Request
```
curl -X PUT \
  http://localhost:3000/products/c5163774-dc37-4f71-b893-b2a096175825 \
  -H 'Content-Type: application/json' \
  -d '{
	"categories": [
		"Mobiles",
		"One Plus"
	]
}'
```

Response
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

### Get
Request
```
curl -X GET \
  'http://localhost:3000/products?category=One%20Plus'
```

Response
```
[
    {
        "_id": "c5163774-dc37-4f71-b893-b2a096175825",
        "description": "mobile phone",
        "name": "Oneplus 5",
        "price": 38499,
        "categories": [
            "Mobiles",
            "One Plus"
        ]
    }
]
```