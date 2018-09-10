/**
 * Temperature Sensor
 */
//% weight=99 color=#000000 icon="\uf2c9" block="SW10"
namespace SW10 {
    // Device I2C Address
    let LM75B_I2C_ADDR = 0x48

    // Register Defines
    const LM75B_REG_CONF = 0x01
    const LM75B_REG_TEMP = 0x00
    const LM75B_REG_TOS = 0x03
    const LM75B_REG_THYST = 0x02

    export enum SW10_ADDR {
        Default = 0x48,
        A0 = 0x49,
        A1 = 0x4A,
        A2 = 0x4C,
        A0_A1 = 0x4B,
        A0_A2 = 0x4D,
        A1_A2 = 0x4E,
        A0_A1_A2 = 0x4F
    }

    function readTemperature(): number {
        let buf: Buffer = pins.createBuffer(1);
        buf[0] = LM75B_REG_TEMP;
        pins.i2cWriteBuffer(LM75B_I2C_ADDR, buf, false);
        let data = pins.i2cReadNumber(LM75B_I2C_ADDR, NumberFormat.UInt16BE, false);
        return ((data >> 5) / 8);
    }

    /**
    * Used to set the Alternative address of the SW10
    * @param chipAddress [72-80] The I2C address of your LM75B; eg: 72 
    */
    //% blockId="setAddress" block="set device address %SW10_ADDR"
    //% weight=99
    export function setAddress(SW10_ADDR: SW10_ADDR = 1): void {
        LM75B_I2C_ADDR = SW10_ADDR;
    }

    /**
	* SW10 Temperature measurement
	*/
    //% blockId="TempC" block="get Temperature (C)"
    //% weight=99
    export function getTempC(): number {
        return readTemperature();
    }

    /**
	* SW10 Temperature measurement
	*/
    //% blockId="TempF" block="get Temperature (F)"
    //% weight=99
    export function getTempF(): number {
        return (((getTempC() * 18) / 10) + 32);
    }
}

