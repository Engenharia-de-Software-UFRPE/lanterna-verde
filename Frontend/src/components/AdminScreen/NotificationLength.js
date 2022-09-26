
const NotificationLength = ({ notifSize }) => {

    class Badge {
        constructor(element, options) {
        this.value = 0;
        this.options = options || {
            badgeClass: 'notification-badge',
            badgeCounterClass: 'notification-counter',
            animationSpeed: 150
        }
        if (!element) return;
        this.element = element;
        this.render();
        this.badgeElement = element.querySelector('.' + this.options.badgeClass);
        this.badgeCounterElement = element.querySelector('.' + this.options.badgeCounterClass);
        }

        render() {
            let counter = document.createElement('SPAN');
            counter.className = this.options.badgeClass;
            counter.innerHTML = `<span class="${this.options.badgeCounterClass}">0</span>`;
            
            this.element.appendChild(counter);
        }

        set(n) {
            n = n || 0;
            let newCounterElement = this.badgeCounterElement.cloneNode();
    
            // If value is somehow become wrong, wrong type, less than 0, or NaN. 
            // Then hide everything and log an error.
            if (typeof n != 'number' || n < 0 || isNaN(n)) {
            console.error('Wrong type or n(' + n + ') is less then 0!');
            this.badgeElement.classList.remove('notification-badge--active');
            this.badgeCounterElement.innerHTML = '';
    
            return false;
            }
    
            if (n === 0) {
            this.badgeElement.classList.remove('notification-badge--active');
            this.badgeCounterElement.innerHTML = '';
    
            return false;
            }
    
            if (n > 99) {
            this.badgeElement.classList.add('notification-badge--limit');
            } else {
            this.badgeElement.classList.remove('notification-badge--limit');
            }
    
            if (!this.badgeElement.classList.contains('notification-badge--active')) {
            this.badgeElement.classList.add('notification-badge--active');
            }      
    
            let timer;
            let animate = new Promise((resolve, reject) => {
            newCounterElement.innerHTML = n;
            newCounterElement.classList.add('notification-counter--new');
            this.badgeCounterElement.classList.add('notification-counter--old');
            this.badgeCounterElement.after(newCounterElement);
    
            if (timer) clearTimeout(timer);
            timer = setTimeout(resolve, 0);
            });
    
            animate.then(() => {
            newCounterElement.classList.remove('notification-counter--new');
            setTimeout(() => {
                this.badgeCounterElement.remove();
                this.badgeCounterElement = newCounterElement
            }, this.options.animationSpeed);
            }, () => false);
        }

        get() {
            let n = parseInt(this.element.querySelector('.' + this.options.badgeCounterClass).innerHTML) || 0;
            return typeof n != 'number' ? this.value : n;
        }

        increase(n) {
            n = n || 1;
            this.value = this.get() || 0;
    
            if (this.value + n < 0) {
            return false;
            }
    
            this.set(this.value + n);
        }
    }

    let notificationElement = document.querySelector('.notification');
    let customNotification = new Badge(notificationElement);

    const action = document.querySelector('.notification'); 
    if(action){
        if(notifSize > 0){
            customNotification.increase(notifSize);
            action.addEventListener('click', () => {
                customNotification.set(0);
            }); 
        } 
    }
}

export default NotificationLength;