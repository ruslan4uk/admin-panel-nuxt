export default function({ $axios, store, app, redirect }) {
    $axios.onError(error => {
        
        if (error.response && error.response.status === 422) {
            store.dispatch('validation/setErrors', error.response.data.errors);
        }

        if (error.response && error.response.status === 401) {
            app.$auth.logout();
            //return app.$router.push({name: 'index'});
            //return redirect('/auth/login');
        }

        return Promise.reject(error);
        
    });

    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors');
    });
}