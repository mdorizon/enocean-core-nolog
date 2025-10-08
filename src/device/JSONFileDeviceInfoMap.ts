// Project: enocean-core
// File: JSONFileDeviceInfoMap.ts
//
// Copyright 2020 Henning Kerstan
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { DeviceInfoMap } from './DeviceInfoMap'
import { DeviceInfo } from './DeviceInfo'
import { DeviceId } from './DeviceId'
import * as fs from 'fs'
import * as path from 'path'
import { EEPId } from '../eep/EEPId'
import { JSONFileDeviceInfoMapEntry } from './JSONFileDeviceInfoMapEntry'

export class JSONFileDeviceInfoMap implements DeviceInfoMap {
  private jsonFile: string = path.join(
    process.cwd(),
    '.known_enocean_devices.json'
  )
  private devices: Map<string, DeviceInfo> = new Map()

  /**
   * Returns a new map using the default file ('.known_enocean_devices.json')
   */
  static defaultFile(): JSONFileDeviceInfoMap {
    return new JSONFileDeviceInfoMap()
  }

  private constructor() {
    try {
      if (fs.existsSync(this.jsonFile)) {
        const fileContent = fs.readFileSync(this.jsonFile, { encoding: 'utf8' })
        const devices = new Map<string, JSONFileDeviceInfoMapEntry>(
          JSON.parse(fileContent)
        )

        devices.forEach((value: JSONFileDeviceInfoMapEntry, key: string) => {
          const info = new DeviceInfo()
          info.deviceId = DeviceId.fromString(value.deviceId)
          info.label = value.label
          info.eep = EEPId.fromString(value.eep)
          info.localId = DeviceId.fromString(value.localId)
          info.manufacturer = value.manufacturer
          info.teachInMethod = value.teachInMethod
          this.devices.set(DeviceId.fromString(key).toString(), info)
        })
      }
    } catch {
      // no console log
    }
  }

  get(device: DeviceId): DeviceInfo | undefined {
    return this.devices.get(device.toString())
  }

  set(info: DeviceInfo): void {
    this.devices.set(info.deviceId.toString(), info)
    this.storeToFile()
  }

  has(device: DeviceId): boolean {
    return this.devices.has(device.toString())
  }

  delete(device: DeviceId): boolean {
    const result = this.devices.delete(device.toString())
    this.storeToFile()
    return result
  }

  clear(): void {
    this.devices.clear()
    this.storeToFile()
  }

  forEach(callbackfn: (info: DeviceInfo, device: DeviceId) => void): void {
    this.devices.forEach((info, deviceString) => {
      callbackfn(info, DeviceId.fromString(deviceString))
    })
  }

  private storeToFile(): void {
    try {
      const json = JSON.stringify(Array.from(this.devices.entries()), null, 2)
      fs.writeFileSync(this.jsonFile, json)
    } catch {
      // no console log
    }
  }
}
