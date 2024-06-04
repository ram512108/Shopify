if (!customElements.get("product-card")) {
    customElements.define(
      "product-card",
      class ProductCard extends HTMLElement {
        constructor() {
          super();
  
          this.form = this.querySelector("form");
          this.form.querySelector("[name=id]").disabled = false;
          this.form.addEventListener("submit", this.onSubmitHandler.bind(this));
          this.cart =
            document.querySelector("cart-notification") ||
            document.querySelector("cart-drawer");
          this.submitButton = this.querySelector('[type="submit"]');
  
          if (document.querySelector("cart-drawer"))
            this.submitButton.setAttribute("aria-haspopup", "dialog");
  
          this.hideErrors = this.dataset.hideErrors === "true";
        }
  
        onSubmitHandler(evt) {
          evt.preventDefault();
          if (this.submitButton.getAttribute("aria-disabled") === "true") return;
  
          this.handleErrorMessage();
  
          this.submitButton.setAttribute("aria-disabled", true);
          this.submitButton.classList.add("loading");
          this.querySelector(".loading__spinner").classList.remove("hidden");
          this.addCart();
        }
  
        async addCart() {
          try {
            const formData = new FormData(this.form);
  
            const items = {
              items: [
                {
                  id: formData.get('id'),
                  quantity: formData.get('quantity')
                }
              ]
            };
  
            if (this.cart) {
              items.sections = this.cart.getSectionsToRender().map((section) => section.id);
              items.sections_url = window.location.pathname;
              this.cart.setActiveElement(document.activeElement);
            }
  
            const config = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(items),
            };
            
  
            const response = await fetch(window.Shopify.routes.root + "cart/add.js", config);
  
            const result = await response.json();
            if (result.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: result.errors || response.description,
                message: result.message,
              });
              this.handleErrorMessage(result.description);
  
              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButton.querySelector('span').classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location = window.routes.cart_url;
              return;
            }
  
            if (!this.error)
              publish(PUB_SUB_EVENTS.cartUpdate, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                cartData: result,
              });
            this.error = false;
            const quickAddModal = this.closest('quick-add-modal');
            if (quickAddModal) {
              document.body.addEventListener(
                'modalClosed',
                () => {
                  setTimeout(() => {
                    this.cart.renderContents(result);
                  });
                },
                { once: true }
              );
              quickAddModal.hide(true);
            } else {
              this.cart.renderContents(result);
            }
          } catch (error) {
            console.log(error);
          } finally {
            this.submitButton.classList.remove("loading");
            if (this.cart && this.cart.classList.contains("is-empty"))
              this.cart.classList.remove("is-empty");
            if (!this.error) this.submitButton.removeAttribute("aria-disabled");
            this.querySelector(".loading__spinner").classList.add("hidden");
          }
        }
  
        handleErrorMessage(errorMessage = false) {
          if (this.hideErrors) return;
  
          this.errorMessageWrapper =
            this.errorMessageWrapper ||
            this.querySelector(".product-form__error-message-wrapper");
          if (!this.errorMessageWrapper) return;
          this.errorMessage =
            this.errorMessage ||
            this.errorMessageWrapper.querySelector(
              ".product-form__error-message"
            );
  
          this.errorMessageWrapper.toggleAttribute("hidden", !errorMessage);
  
          if (errorMessage) {
            this.errorMessage.textContent = errorMessage;
          }
        }
      }
    );
  }
  