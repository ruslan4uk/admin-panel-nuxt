export default function({ $axios, store }) {
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)

        if ([422].includes(code)) {
            store.dispatch('validation/setErrors', error.response.data.errors);
        }

        if ([401, 403].includes(code)) {
            app.$auth.logout();
          }

        return Promise.reject(error);
    });

    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors');
    });
}