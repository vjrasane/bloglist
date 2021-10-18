const users = require("./users")
// @ponicode
describe("users", () => {
    test("0", () => {
        let callFunction = () => {
            users({ broadcast: () => 12 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            users({ broadcast: () => 12345 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            users({ broadcast: () => "a1969970175" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            users({ broadcast: () => 987650 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            users({ broadcast: () => "bc23a9d531064583ace8f67dad60f6bb" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            users(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
