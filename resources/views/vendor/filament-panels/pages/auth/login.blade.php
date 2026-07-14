<x-filament-panels::page.simple>
    <div class="gn-login">
       <div class="gn-login-left">
    <div class="gn-brand">
        <span class="gn-brand-icon">🏠</span>
        <span>GrihNirmaan</span>
    </div>

    <div class="gn-left-content">
       <p>
    Sign in to securely access the GrihNirmaan Admin Portal and manage leads, projects, customers, quotations, and daily business operations from one centralized dashboard.
</p>

        <div class="gn-testimonial">
            <img src="/uploads/images/founder.jpg" alt="GrihNirmaan Admin">

            <div>
                <h4>Management Dashboard</h4>
                <span>Internal Access Only</span>

               <p>
               Securely manage projects, customers, reports, and daily operations in one place.
               </p>
            </div>
        </div>
    </div>

   
</div>

        <div class="gn-login-center"></div>

        <div class="gn-login-right">
            <div class="gn-form-wrap">
                <div class="gn-form-card">
                    <div class="gn-tabs">
                        <span class="active">Administrator</span>

                    </div>

                    @if (filament()->hasRegistration())
                        <div class="gn-register-text">
                            {{ $this->registerAction }}
                        </div>
                    @endif

                    {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::AUTH_LOGIN_FORM_BEFORE, scopes: $this->getRenderHookScopes()) }}

                    <x-filament-panels::form id="form" wire:submit="authenticate">
                        {{ $this->form }}

                        <x-filament-panels::form.actions
                            :actions="$this->getCachedFormActions()"
                            :full-width="$this->hasFullWidthFormActions()"
                        />
                    </x-filament-panels::form>

                    {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::AUTH_LOGIN_FORM_AFTER, scopes: $this->getRenderHookScopes()) }}


                </div>
            </div>
        </div>
    </div>
</x-filament-panels::page.simple>
