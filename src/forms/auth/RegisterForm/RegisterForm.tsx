// src/forms/auth/RegisterForm/RegisterForm.tsx
import { Link } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useRegisterForm } from './useRegisterForm';
import TermsAndConditionsDialog from '@/components/dialogs/TermsAndConditionsDialog';
import FieldError from '@/components/core-ui/FieldError';
import Alert from '@/components/core-ui/Alert';

const RegisterForm = () => {
  const {
    form,
    registerSuccessMessage,
    registerErrorMessage,
    termsConditionsModalOpen,
    openTerms,
    closeTerms,
  } = useRegisterForm();

  const isRecruiter = form.values.user_type === 'recruiter';

  return (
    <>
      {registerSuccessMessage && (
        <div className="mb-4">
          <Alert type="success" message={registerSuccessMessage} />
        </div>
      )}

      {registerErrorMessage && (
        <div className="mb-4">
          <Alert type="error" message={registerErrorMessage} />
        </div>
      )}

      <form onSubmit={form.handleSubmit} className="space-y-6" noValidate>
        {/* ----- Type d'utilisateur ----- */}
        <div>
          <label
            htmlFor="user_type"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Register as <span className="text-red-500">*</span>
          </label>
          <select
            id="user_type"
            name="user_type"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            disabled={form.isSubmitting}
            value={form.values.user_type}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          >
            <option value="candidate">Job Seeker / Candidate</option>
            <option value="recruiter">HR Recruiter / Company</option>
          </select>
          {form.touched.user_type && form.errors.user_type && (
            <FieldError error={form.errors.user_type} />
          )}
        </div>
{/* Prénom */}
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-900">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            value={form.values.first_name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            disabled={form.isSubmitting}
          />
          {form.touched.first_name && form.errors.first_name && (
            <FieldError error={form.errors.first_name} />
          )}
        </div>

        {/* Nom */}
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-900">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            value={form.values.last_name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            disabled={form.isSubmitting}
          />
          {form.touched.last_name && form.errors.last_name && (
            <FieldError error={form.errors.last_name} />
          )}
        </div>
        {/* ----- Champ Company Name (uniquement pour recruteur) ----- */}
        {isRecruiter && (
          <div>
            <label
              htmlFor="company_name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company Name <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                id="company_name"
                name="company_name"
                type="text"
                autoComplete="organization"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={form.values.company_name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={form.isSubmitting}
                placeholder="Your company name"
              />
              {form.touched.company_name && form.errors.company_name && (
                <FieldError error={form.errors.company_name} />
              )}
            </div>
          </div>
        )}

        {/* ----- Email ----- */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              disabled={form.isSubmitting}
            />
            {form.touched.email && form.errors.email && (
              <FieldError error={form.errors.email} />
            )}
          </div>
        </div>

        {/* ----- Password ----- */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              disabled={form.isSubmitting}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          {form.touched.password && form.errors.password && (
            <FieldError error={form.errors.password} />
          )}
        </div>

        {/* ----- Confirm Password ----- */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm password <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              disabled={form.isSubmitting}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          {form.touched.confirmPassword && form.errors.confirmPassword && (
            <FieldError error={form.errors.confirmPassword} />
          )}
        </div>

        {/* ----- CGU ----- */}
        <div>
          <div className="flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="termsConditions"
                name="termsConditions"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                checked={form.values.termsConditions}
                onChange={(e) => form.setFieldValue('termsConditions', e.target.checked)}
                disabled={form.isSubmitting}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="termsConditions" className="text-gray-700">
                I agree to the{' '}
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  onClick={openTerms}
                >
                  terms and conditions
                </button>
              </label>
              {form.touched.termsConditions && form.errors.termsConditions && (
                <FieldError error={form.errors.termsConditions} />
              )}
            </div>
          </div>
        </div>

        {/* Erreur générale (ex: email déjà utilisé, erreur serveur, etc.) */}
        {form.errors.general && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{form.errors.general}</div>
          </div>
        )}

        {/* ----- Submit ----- */}
        <div>
          <button
            type="submit"
            disabled={form.isSubmitting}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {form.isSubmitting ? 'Creating account...' : 'Sign up'}
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Log in
        </Link>
      </p>

      <TermsAndConditionsDialog open={termsConditionsModalOpen} onClose={closeTerms} />
    </>
  );
};

export default RegisterForm;