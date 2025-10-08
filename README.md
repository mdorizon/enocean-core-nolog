# EnOcean-Core-Sniffer

**EnOcean-Core-Sniffer** is a [TypeScript](https://www.typescriptlang.org/) implementation of core EnOcean functionality for [Node.js](https://nodejs.org/), forked from [EnOcean-Core](https://github.com/henningkerstan/enocean-core).
This fork adds a **sniffer mode** that allows you to receive and interpret EnOcean telegrams **without requiring devices to be registered in the filesystem**.

It can be used with a [TCM310 transceiver module](https://www.enocean.com/en/products/enocean_modules/tcm-310/) or compatible hardware.

---

## Features

* Sending and receiving ERP1 telegrams.
* Manual and automatic teach-in (UTE, 4BS).
* Automatic interpretation of EEP data for known devices.
* **Sniffer mode** (experimental): ignores filesystem restrictions for unknown devices.
* Fully compatible with TypeScript and Node.js.

---

## Installation

Install your local fork directly:

```bash
# From your fork's directory
npm install -g /path/to/enocean-core-sniffer
```

Or you can link it locally to your project:

```bash
cd /path/to/enocean-core-sniffer
npm link

cd /your/project
npm link enocean-core-sniffer
```

> Make sure you have installed all dependencies with `npm install` in the fork.

---

## Usage

### Import and connect

```typescript
import * as EnOcean from "enocean-core-sniffer"

const gateway = EnOcean.Gateway.connectToSerialPort('/dev/ttyAMA0')
```

### Enable Sniffer Mode

```typescript
import { JSONFileDeviceInfoMap } from "enocean-core-sniffer"

const snifferMap = JSONFileDeviceInfoMap.snifferMode()
// Use snifferMap in your gateway instead of the default known-device map
```

### Receiving telegrams

```typescript
gateway.onReceivedERP1Telegram((telegram) => {
    console.log('Telegram received:', telegram.toString())
})
```

### Sending telegrams

```typescript
const result = await gateway.sendERP1Telegram(telegram)
console.log(result === 0 ? 'Sent successfully' : 'Send failed')
```
