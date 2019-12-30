class Promise {
  constructor(callback) {
      this.state = 'pending';
      this.value = null;
      this.callbacksChain = [];
      this.handleError = () => {};

      this.resolve = this.resolve.bind(this);
      this.reject = this.reject.bind(this);

      callback(this.resolve, this.reject);
  }

  then (resolve) {
    this.callbacksChain.push(resolve);

      return this;
  }

  catch (handleError) {
    this.handleError = handleError;

    return this;
  }

  resolve (value) {
    let result = value;
    this.callbacksChain.forEach(fn => {
        result = fn(result);
        this.state = 'fulfilled';
        this.value = result;
    });
  }

  reject (error) {
    this.state = 'rejected';
    this.handleError(error);
  }
} 

function promiseAll (promises) {
    let results = [];
    var completed = 0;
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        promise.then(data => {
          results[index] = data;
          console.log({data});
          completed += 1;
          if(completed === promises.length) {
            resolve(results);
            console.log({results});
          }
        }).catch(error => reject(error))
        });
      });
    };
