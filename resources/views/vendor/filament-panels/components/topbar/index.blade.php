@props([
    'navigation',
])

<div
    {{
        $attributes->class([
            'fi-topbar sticky top-0 z-20 overflow-x-clip',
            'fi-topbar-with-navigation' => filament()->hasTopNavigation(),
        ])
    }}
>
    <nav
        class="flex h-16 items-center gap-x-4 bg-white px-4 shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 md:px-6 lg:px-8"
        x-data="{
            isFullscreen: false,
            toggleFullscreen() {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                    this.isFullscreen = true;
                } else {
                    document.exitFullscreen();
                    this.isFullscreen = false;
                }
            }
        }"
    >
        {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::TOPBAR_START) }}

        @if (filament()->hasNavigation())
            <x-filament::icon-button
                color="gray"
                icon="heroicon-o-bars-3"
                icon-size="lg"
                :label="__('filament-panels::layout.actions.sidebar.expand.label')"
                x-cloak
                x-on:click="$store.sidebar.open()"
                x-show="! $store.sidebar.isOpen"
                @class([
                    'fi-topbar-open-sidebar-btn',
                    'lg:hidden' => (! filament()->isSidebarFullyCollapsibleOnDesktop()) || filament()->isSidebarCollapsibleOnDesktop(),
                ])
            />

            <x-filament::icon-button
                color="gray"
                icon="heroicon-o-x-mark"
                icon-size="lg"
                :label="__('filament-panels::layout.actions.sidebar.collapse.label')"
                x-cloak
                x-on:click="$store.sidebar.close()"
                x-show="$store.sidebar.isOpen"
                class="fi-topbar-close-sidebar-btn lg:hidden"
            />
        @endif

        @if (filament()->hasTopNavigation() || (! filament()->hasNavigation()))
            <div class="me-6 hidden lg:flex">
                @if ($homeUrl = filament()->getHomeUrl())
                    <a {{ \Filament\Support\generate_href_html($homeUrl) }}>
                        <x-filament-panels::logo />
                    </a>
                @else
                    <x-filament-panels::logo />
                @endif
            </div>

            @if (filament()->hasNavigation())
                <ul class="me-4 hidden items-center gap-x-4 lg:flex">
                    @foreach ($navigation as $group)
                        @if ($groupLabel = $group->getLabel())
                            <x-filament::dropdown placement="bottom-start" teleport>
                                <x-slot name="trigger">
                                    <x-filament-panels::topbar.item
                                        :active="$group->isActive()"
                                        :icon="$group->getIcon()"
                                    >
                                        {{ $groupLabel }}
                                    </x-filament-panels::topbar.item>
                                </x-slot>

                                <x-filament::dropdown.list>
                                    @foreach ($group->getItems() as $item)
                                        @php
                                            $itemIsActive = $item->isActive();
                                        @endphp

                                        <x-filament::dropdown.list.item
                                            :badge="$item->getBadge()"
                                            :badge-color="$item->getBadgeColor()"
                                            :color="$itemIsActive ? 'primary' : 'gray'"
                                            :href="$item->getUrl()"
                                            :icon="$itemIsActive ? ($item->getActiveIcon() ?? $item->getIcon()) : $item->getIcon()"
                                            tag="a"
                                            :target="$item->shouldOpenUrlInNewTab() ? '_blank' : null"
                                        >
                                            {{ $item->getLabel() }}
                                        </x-filament::dropdown.list.item>
                                    @endforeach
                                </x-filament::dropdown.list>
                            </x-filament::dropdown>
                        @endif
                    @endforeach
                </ul>
            @endif
        @endif

        <div class="ms-auto flex items-center gap-x-3">

            {{-- Working Filament Global Search --}}
        @if (filament()->isGlobalSearchEnabled())
    <div class="hidden w-72 md:block">
        @livewire(Filament\Livewire\GlobalSearch::class)
    </div>
@endif

            {{-- Fullscreen Toggle --}}
            <button
                type="button"
                x-on:click="toggleFullscreen()"
                class="grid h-10 w-10 place-items-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800"
                title="Toggle Fullscreen"
            >
                <x-heroicon-o-arrows-pointing-out x-show="!isFullscreen" class="h-5 w-5" />
                <x-heroicon-o-arrows-pointing-in x-show="isFullscreen" x-cloak class="h-5 w-5" />
            </button>

            {{-- Notification Icon --}}
            @if (filament()->auth()->check())
                @if (filament()->hasDatabaseNotifications())
                    @livewire(Filament\Livewire\DatabaseNotifications::class, [
                        'lazy' => filament()->hasLazyLoadedDatabaseNotifications(),
                    ])
                @else
                    <button
                        type="button"
                        class="relative grid h-10 w-10 place-items-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800"
                        title="Notifications"
                    >
                        <x-heroicon-o-bell class="h-5 w-5" />
                        <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger-500"></span>
                    </button>
                @endif

                {{-- User Menu --}}
                <x-filament-panels::user-menu />
            @endif
        </div>

        {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::TOPBAR_END) }}
    </nav>
</div>
