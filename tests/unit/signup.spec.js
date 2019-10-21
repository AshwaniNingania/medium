import { shallowMount } from '@vue/test-utils'
import SignUp from '@/views/SignUp.vue'

function getSignUpWrapper() {
  const wrapper = shallowMount(SignUp, {
    propsData: {},
  })
  return wrapper
}

describe('SignUp.vue', () => {
    it('is a Vue instance', () => {
        const wrapper = getSignUpWrapper();
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    it('should have email input to input email id', () => {
        const wrapper = getSignUpWrapper();
        expect(wrapper.find('#email')).toBeTruthy();
    });

    it('should have password input to input email id', () => {
        const wrapper = getSignUpWrapper();
        expect(wrapper.find('#password')).toBeTruthy();
    });
});
