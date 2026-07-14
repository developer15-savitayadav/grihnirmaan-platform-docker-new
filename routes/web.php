<?php

use App\Http\Controllers\{
    BlogController,
    ContactController,
    CostCalculatorController,
    HomeController,
    InquiryController,
    LeadController,
    NriLeadController,
    LocalityController,
    NewsletterController,
    PageController,
    ProfileController,
    ProjectController,
    QuoteController,
    ServiceController
};
use App\Http\Controllers\Auth\MobileOtpLoginController;
use App\Http\Controllers\Portal\{
    DashboardController,
    DocumentController,
    MessageController,
    PhotoController,
    ProjectController as PortalProjectController
};
use App\Http\Controllers\Webhooks\TwilioWebhookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Middleware\VerifyTwilioSignature;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;

Route::post('/webhooks/twilio/whatsapp/incoming-test', [TwilioWebhookController::class, 'incomingWhatsapp'])
    ->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/webhooks/twilio/whatsapp/incoming', [TwilioWebhookController::class, 'incomingWhatsapp'])
    ->withoutMiddleware([VerifyCsrfToken::class])
    ->middleware(VerifyTwilioSignature::class);

Route::get('/book-consultation', [PageController::class, 'calendlyform'])
    ->name('consultation.book');
/*
|--------------------------------------------------------------------------
| Public Frontend Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

/*
|--------------------------------------------------------------------------
| Newsletter Routes
|--------------------------------------------------------------------------
*/

Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe'])
    ->name('newsletter.subscribe');

Route::get('/newsletter/confirm/{token}', [NewsletterController::class, 'confirm'])
    ->name('newsletter.confirm');

/*
|--------------------------------------------------------------------------
| Lead / Quote Form Submit
|--------------------------------------------------------------------------
*/


Route::post('/leads', [LeadController::class, 'store'])->name('leads.store');

/*
|--------------------------------------------------------------------------
| Services Routes
|--------------------------------------------------------------------------
*/

Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');

/*
|--------------------------------------------------------------------------
| How It Works
|--------------------------------------------------------------------------
*/

Route::get('/how-it-works', [PageController::class, 'howItWorks'])
    ->name('how-it-works');

/*
|--------------------------------------------------------------------------
| NRI Routes
|--------------------------------------------------------------------------
*/
Route::get('/nri', [PageController::class, 'nri'])
    ->name('nri');
Route::post('/nri/leads', [NriLeadController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('nri.leads.store');
/*
|--------------------------------------------------------------------------
| Projects Routes
|--------------------------------------------------------------------------
*/

Route::get('/projects', [ProjectController::class, 'index'])
    ->name('projects.index');

Route::get('/projects/{project:slug}', [ProjectController::class, 'show'])
    ->name('projects.show');

/*
|--------------------------------------------------------------------------
| Cost Calculator
|--------------------------------------------------------------------------
*/

Route::get('/cost-calculator', [CostCalculatorController::class, 'show'])
    ->name('cost-calculator.show');

Route::get('/quote/download/{lead}', [CostCalculatorController::class, 'downloadPdf'])
    ->name('quote.download');
/*
|--------------------------------------------------------------------------
| Quote Page
|--------------------------------------------------------------------------
*/

Route::get('/quote', [QuoteController::class, 'show'])->name('quote.show');
Route::post('/quote', [QuoteController::class, 'store'])->name('quote.store');

/*
|--------------------------------------------------------------------------
| About Pages
|--------------------------------------------------------------------------
*/

Route::get('/about', [PageController::class, 'about'])
    ->name('about');

Route::get('/about/team', [PageController::class, 'team'])
    ->name('about.team');

Route::get('/about/partners', [PageController::class, 'partners'])
    ->name('about.partners');

/*
|--------------------------------------------------------------------------
| Blog Routes
|--------------------------------------------------------------------------
*/

Route::get('/blog', [BlogController::class, 'index'])
    ->name('blog.index');

Route::get('/blog/{slug}', [BlogController::class, 'show'])
    ->name('blog.show');


/*
|--------------------------------------------------------------------------
| Contact Routes
|--------------------------------------------------------------------------
*/

Route::get('/contact', [ContactController::class, 'index'])
    ->name('contact');

Route::post('/contact', [InquiryController::class, 'store'])
    ->name('contact.submit');


/*
|--------------------------------------------------------------------------
| Lucknow Locality Pages
|--------------------------------------------------------------------------
*/
Route::get('/lucknow', [LocalityController::class, 'index'])
    ->name('lucknow.index');
Route::get('/lucknow/{locality}', [LocalityController::class, 'show'])
    ->name('lucknow.locality');


/*
|--------------------------------------------------------------------------
| Legal / Static Pages
|--------------------------------------------------------------------------
*/

Route::get('/privacy', [PageController::class, 'privacy'])
    ->name('privacy');

Route::get('/terms', [PageController::class, 'terms'])
    ->name('terms');

Route::get('/thank-you', [PageController::class, 'thankYou'])
    ->name('thank-you');

/*
|--------------------------------------------------------------------------
| Breeze Dashboard
|--------------------------------------------------------------------------
*/


Route::post('/mobile-login/verify-otp', [MobileOtpLoginController::class, 'verifyOtp'])
    ->middleware('guest')
    ->name('mobile.otp.verify');

Route::post('/mobile-login/resend-otp', [MobileOtpLoginController::class, 'resendOtp'])
    ->middleware('guest')
    ->name('mobile.otp.resend');

Route::post('/mobile-login/cancel-otp', [MobileOtpLoginController::class, 'cancel'])
    ->middleware('guest')
    ->name('mobile.otp.cancel');

Route::middleware(['auth', 'verified'])->prefix('portal')->name('portal.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/projects/{project}', [PortalProjectController::class, 'show'])
        ->name('projects.show');
    Route::get('/documents', [DocumentController::class, 'index'])
        ->name('documents.index');
    Route::get('/documents/{document}/download', [DocumentController::class, 'download'])
        ->middleware('signed')
        ->name('documents.download');
    Route::get('/photos', [PhotoController::class, 'index'])
        ->name('photos.index');

    Route::get('/messages', [MessageController::class, 'index'])
        ->name('messages.index');

    Route::post('/messages', [MessageController::class, 'store'])
        ->name('messages.store');
});
/*
|--------------------------------------------------------------------------
| Profile Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/auth.php';
