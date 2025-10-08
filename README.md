# EnOcean-Core-NoLog

A lightweight TypeScript implementation of the [EnOcean](https://www.enocean.com/) protocol for Node.js — **with no console logs or filesystem warnings**.  
This is a clean fork of [`enocean-core`](https://www.npmjs.com/package/enocean-core) by Henning Kerstan.

---

## ✨ Key Features
- Written in **TypeScript**
- Supports sending and receiving **ERP1 telegrams**
- Compatible with **TCM310 / USB300 / EnOcean Pi** transceivers
- **No console output** — silent even if `.known_enocean_devices.json` is missing
- Works on Node.js ≥ 20 and npm ≥ 10


## ⚙️ Installation

```bash
npm install enocean-core-nolog
````


## 🚀 Usage Example

```typescript
import * as EnOcean from "enocean-core-nolog"

const gateway = EnOcean.Gateway.connectToSerialPort("/dev/ttyUSB0")

// Listen for incoming EnOcean telegrams
gateway.onReceivedERP1Telegram((telegram) => {
  console.log("Received telegram:", telegram.toString())
})
```

## 🧠 About

This fork simply removes all unnecessary **console warnings** such as:

```
could not read known EnOcean devices from filesystem
```

and keeps the rest of the original library fully functional.
It’s ideal for use in **server or production environments** where clean logs are important.
