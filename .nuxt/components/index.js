export { default as WalletAddress } from '../..\\components\\walletAddress.vue'
export { default as XSideBar } from '../..\\components\\xSideBar.vue'
export { default as PasswordOtp } from '../..\\components\\password\\otp.vue'
export { default as Password } from '../..\\components\\password\\password.vue'
export { default as PasswordStart } from '../..\\components\\password\\start.vue'
export { default as OtherPAlert } from '../..\\components\\other\\pAlert.vue'
export { default as OtherPCreatorCard } from '../..\\components\\other\\pCreatorCard.vue'
export { default as OtherPCreators } from '../..\\components\\other\\pCreators.vue'
export { default as OtherPHowItWorksCard } from '../..\\components\\other\\pHowItWorksCard.vue'
export { default as OtherPLilCard } from '../..\\components\\other\\pLilCard.vue'
export { default as OtherPLiveAuctionCard } from '../..\\components\\other\\pLiveAuctionCard.vue'
export { default as OtherPLiveAuctions } from '../..\\components\\other\\pLiveAuctions.vue'
export { default as OtherPLoading } from '../..\\components\\other\\pLoading.vue'
export { default as OtherPNotification } from '../..\\components\\other\\pNotification.vue'
export { default as OtherPopup } from '../..\\components\\other\\popup.vue'
export { default as OtherPPattern } from '../..\\components\\other\\pPattern.vue'
export { default as OtherPScroll } from '../..\\components\\other\\pScroll.vue'
export { default as OtherPServices } from '../..\\components\\other\\pServices.vue'
export { default as OtherPShowCard } from '../..\\components\\other\\pShowCard.vue'
export { default as OtherPShowcase } from '../..\\components\\other\\pShowcase.vue'
export { default as OtherPSideBar } from '../..\\components\\other\\pSideBar.vue'
export { default as OtherPTransaction } from '../..\\components\\other\\pTransaction.vue'
export { default as OtherPTransactionDetails } from '../..\\components\\other\\pTransactionDetails.vue'
export { default as OtherPViewNotifications } from '../..\\components\\other\\pViewNotifications.vue'
export { default as OtherPWallet } from '../..\\components\\other\\pWallet.vue'
export { default as OtherPWalletCards } from '../..\\components\\other\\pWalletCards.vue'
export { default as OtherWActionsCard } from '../..\\components\\other\\wActionsCard.vue'
export { default as OtherWContainer } from '../..\\components\\other\\wContainer.vue'
export { default as OtherWInvestmentCard } from '../..\\components\\other\\wInvestmentCard.vue'
export { default as OtherWNotify } from '../..\\components\\other\\wNotify.vue'
export { default as OtherWTransaction } from '../..\\components\\other\\wTransaction.vue'
export { default as OtherWTransactionDetails } from '../..\\components\\other\\wTransactionDetails.vue'
export { default as OtherWWalletCard } from '../..\\components\\other\\wWalletCard.vue'
export { default as TransactionsTransactionTable } from '../..\\components\\transactions\\transactionTable.vue'
export { default as UserNextofkin } from '../..\\components\\user\\nextofkin.vue'
export { default as UserProfile } from '../..\\components\\user\\profile.vue'
export { default as UserReferral } from '../..\\components\\user\\referral.vue'
export { default as UserSecurity } from '../..\\components\\user\\security.vue'
export { default as UserVerificationIdentity } from '../..\\components\\user\\verification\\identity.vue'
export { default as UserVerificationSelfie } from '../..\\components\\user\\verification\\selfie.vue'
export { default as UserVerification } from '../..\\components\\user\\verification\\verification.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
