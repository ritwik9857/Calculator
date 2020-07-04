class calculator{
    constructor(previoustext,currenttext){
        this.previoustext=previoustext
        this.currenttext=currenttext
        this.clear()
    }

    clear(){
        this.current=''
        this.previous=''
        this.operation=undefined
    }
    delete(){
        this.current=this.current.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number ==='.' && this.current.includes('.')) return
        this.current=this.current.toString()+ number.toString()
    }
    chooseoperation(operation){
        if(this.current==='')return
        if(this.previous!==''){
            this.compute()
        }
         this.operation=operation
         this.previous=this.current
         this.current=''
    }

    compute(){
        let computation
        const prev=parseFloat(this.previous)
        const curr=parseFloat(this.current)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                computation= prev+curr
                break
                case '-':
                computation= prev-curr
                break
                case '/':
                computation= prev/curr
                break
                case '*':
                computation= prev*curr
                break
                default:
                    return
        }
        this.current=computation
        this.operation=undefined
        this.previous=''

    }
    getdisplaynumber(number){
        const stringnumber=number.toString()
        const integerdigits=parseFloat(stringnumber.split('.')[0])
        const decimaldigits=stringnumber.split('.')[1]
        let integerdisplay
        if(isNaN(integerdigits)){
            integerdisplay=''
        }
        else{
            integerdisplay=integerdigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
            if(decimaldigits !=null){
                return `${integerdisplay}.${decimaldigits}`
            }
            else{
                return integerdisplay
            }
        }

    updatedisplay(){
         this.currenttext.innerText=this.getdisplaynumber(this.current)
         if(this.operation != null){
             this.previoustext.innerText=`${this.getdisplaynumber(this.previous)} ${this.operation}`
         }
         else{
             this.previoustext.innerText=''
         }

    }
}

const numberbutton= document.querySelectorAll('[data-number')
const operationbutton= document.querySelectorAll('[data-operand]')
const equalbutton=document.querySelector('[data-equal]')
const clearbutton=document.querySelector('[data-clear]')
const deletebutton= document.querySelector('[data-delete]')
const previoustext=document.querySelector('[data-previous]')
const currenttext=document.querySelector('[data-current]')

const Calculator=new calculator(previoustext,currenttext)

numberbutton.forEach(button => {
    button.addEventListener('click', () => {
         Calculator.appendNumber(button.innerText)
         Calculator.updatedisplay()
    })
})
operationbutton.forEach(button => {
    button.addEventListener('click', () => {
         Calculator.chooseoperation(button.innerText)
         Calculator.updatedisplay()
    })
})
equalbutton.addEventListener('click', button => {
         Calculator.compute()
         Calculator.updatedisplay()
})
clearbutton.addEventListener('click', button => {
    Calculator.clear()
    Calculator.updatedisplay()
})
deletebutton.addEventListener('click', () => {
    Calculator.delete()
    Calculator.updatedisplay()
})