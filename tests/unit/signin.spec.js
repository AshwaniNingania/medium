import { shallowMount } from '@vue/test-utils'
import SignIn from '@/views/SignIn.vue'

function getSignInWrapper() {
  const wrapper = shallowMount(SignIn, {
    propsData: {},
  })
  return wrapper
}

describe('Signin.vue', () => {
    it('is a Vue instance', () => {
        const wrapper = getSignInWrapper();
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    it('should have email input to input email id', () => {
        const wrapper = getSignInWrapper();
        expect(wrapper.find('#email')).toBeTruthy();
    });

    it('should have password input to input email id', () => {
        const wrapper = getSignInWrapper();
        expect(wrapper.find('#password')).toBeTruthy();
    });
});
