<?php

namespace App\Http\Controllers;

use App\Models\CompanySetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanySettingsController extends Controller
{
    /**
     * Get the current company settings.
     * Creates default settings if they don't exist.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $user = Auth::user();
        $companyId = $user->id;

        // Try to find existing settings or create default ones
        $settings = CompanySetting::firstOrCreate(
            ['company_id' => $companyId],
            [
                'plan_type' => 'premium',
                'modules' => CompanySetting::DEFAULT_MODULES,
            ]
        );

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Update the company settings.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'modules' => 'sometimes|array',
            'modules.triage' => 'sometimes|boolean',
            'modules.reports' => 'sometimes|boolean',
            'modules.medical_records' => 'sometimes|boolean',
            'modules.whatsapp' => 'sometimes|boolean',
            'plan_type' => 'sometimes|string|in:free,basic,premium,enterprise',
        ]);

        $user = Auth::user();
        $companyId = $user->id;

        // Find or create settings
        $settings = CompanySetting::firstOrCreate(
            ['company_id' => $companyId],
            [
                'plan_type' => 'premium',
                'modules' => CompanySetting::DEFAULT_MODULES,
            ]
        );

        // Update modules if provided
        if (isset($validated['modules'])) {
            // Merge with existing modules to preserve any keys not provided
            $currentModules = $settings->modules ?? CompanySetting::DEFAULT_MODULES;
            $settings->modules = array_merge($currentModules, $validated['modules']);
        }

        // Update plan_type if provided
        if (isset($validated['plan_type'])) {
            $settings->plan_type = $validated['plan_type'];
        }

        $settings->save();

        return response()->json([
            'success' => true,
            'message' => 'Configuracoes atualizadas com sucesso',
            'data' => $settings,
        ]);
    }

    /**
     * Check if a specific module is enabled for a company.
     * Public endpoint for module status checking.
     *
     * @param int $companyId
     * @param string $moduleKey
     * @return JsonResponse
     */
    public function checkModule(int $companyId, string $moduleKey): JsonResponse
    {
        $settings = CompanySetting::where('company_id', $companyId)->first();

        if (! $settings) {
            // Return default settings if not configured
            $isEnabled = CompanySetting::DEFAULT_MODULES[$moduleKey] ?? false;
        } else {
            $isEnabled = $settings->isModuleEnabled($moduleKey);
        }

        return response()->json([
            'success' => true,
            'module' => $moduleKey,
            'enabled' => $isEnabled,
            'company_id' => $companyId,
        ]);
    }
}
